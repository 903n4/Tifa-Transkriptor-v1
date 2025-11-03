
import React, { useState, useCallback, useRef } from 'react';
import { UploadCloud, FileAudio } from './Icons';

interface FileUploaderProps {
  onFileSelect: (file: File | null) => void;
  file: File | null;
  error: string | null;
}

const FileUploader: React.FC<FileUploaderProps> = ({ onFileSelect, file, error }) => {
  const [isDragging, setIsDragging] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleDrag = useCallback((e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
  }, []);
  
  const handleDragIn = useCallback((e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.dataTransfer.items && e.dataTransfer.items.length > 0) {
      setIsDragging(true);
    }
  }, []);

  const handleDragOut = useCallback((e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
  }, []);

  const handleDrop = useCallback((e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      onFileSelect(e.dataTransfer.files[0]);
      e.dataTransfer.clearData();
    }
  }, [onFileSelect]);
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      onFileSelect(e.target.files[0]);
    }
  };

  const openFileDialog = () => {
    inputRef.current?.click();
  };

  const borderColor = error ? 'border-red-500' : isDragging ? 'border-teal-400' : 'border-gray-600';
  const textColor = error ? 'text-red-400' : 'text-gray-400';

  return (
    <div
      className={`relative w-full p-8 text-center border-2 border-dashed ${borderColor} rounded-xl cursor-pointer transition-all duration-300 ease-in-out bg-gray-900/50 hover:border-teal-400 hover:bg-gray-900/70`}
      onDragEnter={handleDragIn}
      onDragLeave={handleDragOut}
      onDragOver={handleDrag}
      onDrop={handleDrop}
      onClick={openFileDialog}
    >
      <input
        ref={inputRef}
        type="file"
        accept="audio/*"
        className="hidden"
        onChange={handleChange}
      />
      {file ? (
        <div className="flex flex-col items-center justify-center space-y-2 text-teal-300">
            <FileAudio className="w-16 h-16" />
            <p className="font-semibold text-lg">{file.name}</p>
            <p className="text-sm text-gray-400">
              ({(file.size / 1024 / 1024).toFixed(2)} MB)
            </p>
            <p className="text-xs text-gray-500 mt-2">Click or drag another file to replace</p>
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center space-y-4">
            <div className={`p-4 bg-gray-800 rounded-full ${isDragging ? 'text-teal-400' : 'text-gray-500'} transition-colors`}>
                <UploadCloud className="w-12 h-12" />
            </div>
          <p className="text-lg font-medium text-gray-300">
            <span className="text-teal-400">Click to upload</span> or drag and drop
          </p>
          <p className={textColor}>Audio files up to 20MB</p>
        </div>
      )}
    </div>
  );
};

export default FileUploader;
