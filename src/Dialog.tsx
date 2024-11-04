import {CSSProperties, forwardRef, ReactNode, useImperativeHandle, useRef, useState} from "react";

interface DialogProps {
  children: ReactNode;
  modalMode: 'mini' | 'mega';
  modalStyles?: CSSProperties;
}

const Dialog = forwardRef<HTMLDialogElement, DialogProps>(({children, modalMode, modalStyles}, ref) => {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const [modalAttributes, setModalAttributes] = useState<{
    inert?: string | undefined,
    // loading: string,
  }>({inert: '', /*loading: 'true',*/});

  // @ts-ignore
  useImperativeHandle(ref, () => {
    return {
      close() {
        dialogRef.current?.close();
      },
      open() {
        setModalAttributes((oldAttributes) => ({...oldAttributes, inert: undefined}));
        dialogRef.current?.showModal();
      },
      clientHeight() {
        return dialogRef.current?.clientHeight;
      },
      clientWidth() {
        return dialogRef.current?.clientWidth;
      }
    };
  }, []);

  return (
    <dialog
      ref={dialogRef}
      modal-mode={modalMode}
      {...modalAttributes}
      style={modalStyles}
      onClick={({target: dialog}) => {
        // @ts-ignore
        if (dialog.nodeName === 'DIALOG') {
          dialogRef.current?.close()
        }
      }}
      onClose={() => setModalAttributes((oldAttributes) => ({...oldAttributes, inert: ''}))}>
      {children}
    </dialog>);
});

export default Dialog;
