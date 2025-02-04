"use client";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
} from "@/components/ui/dialog";

interface Modalpageprops {
  isopen: boolean;
  children: React.ReactNode;
  title: string;
  description: string;
  onClose: () => void;
}

const Modal:React.FC<Modalpageprops> = ({isopen,children,title,description,onClose}) => {

  const onChange = (open : boolean) => {
    if(!open){
      onClose();
    }
  }

  return (
    <Dialog open={isopen} onOpenChange={onChange}>
      <DialogContent className="bg-white">
        <DialogTitle>{title}</DialogTitle>
        <DialogDescription>{description}</DialogDescription>
        <div>{children}</div>
      </DialogContent>
    </Dialog>
  );
};

export default Modal;