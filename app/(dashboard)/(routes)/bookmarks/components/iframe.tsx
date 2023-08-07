import React from 'react';
import Iframe from 'react-iframe';
import { X } from 'lucide-react';

interface IframeModalProps{
  url:string;
  onClose: () => void;
}

const IframeModal = ({
  url,
  onClose 
}:IframeModalProps) => {
  return (
    <div className="fixed top-0 left-0 w-screen h-screen bg-black bg-opacity-75 flex justify-center items-center">
      <div className="max-w-3xl w-full h-full bg-white rounded-lg p-4 overflow-hidden">
        <button
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-800"
          onClick={onClose}
        >
          <X size={24} />
        </button>
        <Iframe url={url} width="100%" height="100%" />
      </div>
    </div>
  );
};

export default IframeModal;
