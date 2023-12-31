'use client';

import { useCallback, useEffect, useState } from 'react';
import { IoMdClose } from 'react-icons/io';
import Button from '@/components/Button';
interface ModalProps {
  isOpen?: boolean;
  onClose: () => void;
  onSubmit: () => void;
  title?: string;
  body?: React.ReactElement;
  footer?: React.ReactElement;
  actionLabel: string;
  disabled?: boolean;
  secondaryAction?: () => void;
  secondaryActionLabel?: string;
}

const Modal: React.FC<ModalProps> = ({
  isOpen,
  onClose,
  onSubmit,
  title,
  body,
  footer,
  actionLabel,
  disabled,
  secondaryAction,
  secondaryActionLabel,
}) => {
  const [showModal, setShowModal] = useState(isOpen);

  useEffect(() => {
    setShowModal(isOpen);
  }, [isOpen]);

  const handleClose = useCallback(() => {
    if (disabled) {
      return;
    }

    setShowModal(false);
    setTimeout(() => {
      onClose();
    }, 300);
  }, [disabled, onClose]);

  const handleSubmit = useCallback(() => {
    if (disabled) {
      return;
    }
    onSubmit();
  }, [disabled, onSubmit]);

  const handleSecondaryAction = useCallback(() => {
    if (disabled || !secondaryAction) {
      return;
    }
    secondaryAction();
  }, [disabled, secondaryAction]);

  if (!isOpen) {
    return null;
  }

  return (
    <>
      <div
        className="
          justify-center
          items-center
          flex
          fixed
          inset-0
          z-50
          focus:outline-none
          bg-neutral-800/80
          "
      >
        <div
          className="
          relative
          w-full
          md:w-3/6
          lg:w-2/6
          xl:2-2/3
          mx-auto
          h-full
          lg:h-auto
          md:h-auto
       
          "
        >
          {/* Content */}
          <div
            className={`
          translate
          duration-500
          h-full
          ${showModal ? 'translate-y-0' : 'translate-y-full'}
          ${showModal ? 'opacity-100' : 'opacity-0'}
          `}
          >
            <div
              className="
            translate
            h-full
            lg:h-auto
            border-0
            md:h-auto
            rounded-lg
            shadow-lg
            relative
            flex
            flex-col
            w-full
            bg-white
            outline-none
            focus:outline-none
            "
            >
              {/* Header*/}
              <div
                className="
                flex
                items-center
                p-6
                rounded-t
                justify-center
                relative
                border-b-[1px]
                "
              >
                <button
                  onClick={handleClose}
                  className="
                  p-1
                  border-0
                  hover:opacity-70
                  transition
                  absolute
                  left-6
                    "
                >
                  <IoMdClose size={18} />
                </button>

                <div className="text-[16px] font-semibold">{title}</div>
              </div>
              {/* Body */}
              <div className=" relative p-6 flex-auto">{body}</div>

              {/* Footer*/}
              <div className=" flex p-6 flex-col gap-2 ">
                <div className="flex flex-row items-center gap-4 w-full">
                  {secondaryAction && secondaryActionLabel && (
                    <Button
                      outline
                      disabled={disabled}
                      label={secondaryActionLabel}
                      onClick={handleSecondaryAction}
                    />
                  )}
                  <Button
                    disabled={disabled}
                    label={actionLabel}
                    onClick={handleSubmit}
                  />
                </div>
                {footer}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Modal;
