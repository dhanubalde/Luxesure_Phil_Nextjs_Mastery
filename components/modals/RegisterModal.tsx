'use client';

import axios from 'axios';
import { AiFillGithub } from 'react-icons/ai';
import { FcGoogle } from 'react-icons/fc';
import { useCallback, useState } from 'react';
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form';
import useResgisterModal from '@/hooks/useRegisterModal';
import Modal from './Modal';
import Heading from '@/components/Heading';
import Input from '@/components/inputs/Input';
import { toast } from 'react-hot-toast';
import Button from '../Button';
import { signIn } from 'next-auth/react';
import LoginModal from './LoginModal';
import useLoginModel from '@/hooks/useLoginModal';

const RegisterModal = () => {
  const loginModal = useLoginModel();
  const registerModal = useResgisterModal();
  const [isLoading, setLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FieldValues>({
    defaultValues: {
      name: '',
      email: '',
      password: '',
    },
  });

  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    setLoading(true);

    axios
      .post('api/register', data)
      .then(() => {
        registerModal.onClose();
        loginModal.onOpen();
        toast.success('Successfully Created User :)');
      })
      .catch((error) => {
        toast.error('Something went wrong !');
      })
      .finally(() => {
        setLoading(false);
      });
  };
  const toggle = useCallback(() => {
    loginModal.onOpen();
    registerModal.onClose();
  }, [loginModal, registerModal]);

  const bodyContent = (
    <div className="flex flex-col gap-4">
      {/*components for Heading.tsx */}
      <Heading
        center={false}
        title="Welcome to Luxesure"
        subtitle="Create an a Account"
      />
      {/* components for Input.tsx */}
      <Input
        id="email"
        label="Email"
        disabled={isLoading}
        register={register}
        errors={errors}
        required
      />
      <Input
        id="name"
        label="Name"
        disabled={isLoading}
        register={register}
        errors={errors}
        required
      />
      <Input
        id="password"
        label="Password"
        type="password"
        disabled={isLoading}
        register={register}
        errors={errors}
        required
      />
    </div>
  );

  const footerContent = (
    <div className="flex flex-col gap-4 mt-3">
      <hr />
      <Button
        
        outline
        label="Continue with Google"
        icon={FcGoogle}
        onClick={() => signIn('google')}
      />
      <Button
        
        outline
        label="Continue with GitHub"
        icon={AiFillGithub}
        onClick={() => signIn('github')}
      />
      <div
        className="
       text-neutral-500
        text-center
        mt-4
        font-light 
       "
      >
        <p>
          Alreadt have an account?
          <span
            onClick={toggle}
            className="
            underline
            font-semibold
            cursor-pointer
          text-neutral-500
          "
          >
            Log in
          </span>
        </p>
      </div>
    </div>
  );

  return (
    <Modal
      disabled={isLoading}
      isOpen={registerModal.isOpen}
      title="Register"
      actionLabel="Continue"
      onClose={registerModal.onClose}
      onSubmit={handleSubmit(onSubmit)}
      body={bodyContent}
      footer={footerContent}
    />
  );
};

export default RegisterModal;
