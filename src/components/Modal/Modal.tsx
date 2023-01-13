import { Fragment, useRef } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import { IModal } from '../../types/types';

const Modal = ({
  title,
  children,
  actions,
  show,
  close,
  maxWidth,
  minHeight,
}: IModal) => {
  const cancelButtonRef = useRef(null);

  return (
    <Transition.Root show={show} as={Fragment}>
      <Dialog
        as="div"
        className={`relative z-10 ${show ? 'block' : 'hidden'}`}
        initialFocus={cancelButtonRef}
        onClose={close}
      >
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-gray-900 opacity-75 transition-opacity" />
        </Transition.Child>

        <div className="fixed inset-0 z-10 overflow-y-auto ">
          <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              enterTo="opacity-100 translate-y-0 sm:scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 translate-y-0 sm:scale-100"
              leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            >
              <Dialog.Panel
                className="relative transform overflow-hidden rounded bg-gray-800 text-left shadow-xl transition-all sm:my-8 sm:w-full max-w-fit"
                style={{
                  maxWidth: maxWidth,
                  minHeight: minHeight,
                  maxHeight: '80vh',
                }}
              >
                <div className="flex justify-between pt-4 pb-4 pl-16 rounded-t border-b border-gray-700 bg-gray-700 items-center">
                  <h3 className="text-xl font-semibold text-white dark:text-white">
                    {title}
                  </h3>
                  <button
                    type="button"
                    className="p-2 flex items-center justify-center text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm mr-8 ml-auto  dark:hover:bg-gray-600 dark:hover:text-white"
                    onClick={() => close()}
                  >
                    X
                  </button>
                </div>
                <div
                  className="bg-gray-800 px-4  pt-5 pb-4 sm:p-6 sm:pb-4"
                  style={{ overflow: 'scroll', maxHeight: '61vh' }}
                >
                  <div className="sm:flex sm:items-start w-full">
                    <div className="w-full mt-3 text-center sm:mt-0 sm:ml-10 sm:mr-10 sm:text-left">
                      {children}
                    </div>
                  </div>
                </div>
                <div className="px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6 bg-gray-800">
                  {actions}
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  );
};

export default Modal;
