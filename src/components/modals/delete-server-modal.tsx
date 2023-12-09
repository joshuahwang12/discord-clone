'use client';

import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';

import { useModal } from '@/hooks/use-modal-store';
import { DialogDescription } from '@radix-ui/react-dialog';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

const DeleteServerModal = () => {
  const { isOpen, onClose, type, data } = useModal();
  const router = useRouter();

  const isModalOpen = isOpen && type === 'deleteServer';
  const { server } = data;

  const [isLoading, setIsloading] = useState(false);

  const [inputValue, setInputValue] = useState('');
  const [isInputValid, setIsInputValid] = useState(false);

  const handleInputChange = (e: any) => {
    const value = e.target.value;
    setInputValue(value);
    setIsInputValid(value.trim() === server?.name);
  };

  const onClick = async () => {
    try {
      setIsloading(true);
      await axios.delete(`/api/server/${server?.id}`);
      router.refresh();
      router.push('/');
    } catch (error) {
      console.log(error);
    } finally {
      setIsloading(false);
    }
  };

  return (
    <Dialog open={isModalOpen} onOpenChange={onClose}>
      <DialogContent className="bg-white text-black p-0 overflow-hidden">
        <DialogHeader className="pt-8 px-6">
          <DialogTitle className="text-2xl text-center font-bold">
            Delete Server
          </DialogTitle>
          <DialogDescription className="text-center text-zinc-500">
            Are you sure you want to do this? <br />
            <span className="text-indigo-500 font-semibold">
              {server?.name}
            </span>{' '}
            will be permantly deleted.
          </DialogDescription>
          <br />
          <Input
            type="text"
            placeholder="Type complete server name to confirm"
            value={inputValue}
            onInput={handleInputChange}
            className="bg-zinc-300 border-0 focus-visible:ring-0 text-black focus-visible:ring-offset-0"
          />
        </DialogHeader>
        <DialogFooter className="bg-gray-100 px-6 py-4">
          <div className="flex item-center justify-between w-full">
            <Button disabled={isLoading} onClick={onClose} variant="ghost">
              Cancel
            </Button>
            <Button
              disabled={!isInputValid || isLoading}
              variant="destructive"
              onClick={onClick}
            >
              Delete
            </Button>
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default DeleteServerModal;
