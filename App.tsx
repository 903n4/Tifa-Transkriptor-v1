
import React, { useState, useCallback } from 'react';
import { transcribeAudio } from './services/geminiService';
import Header from './components/Header';
import FileUploader from './components/FileUploader';
import Button from './components/Button';
import TranscriptionDisplay from './components/TranscriptionDisplay';
import Loader from './components/Loader';
import { AlertTriangle } from './components/Icons';

const MAX_FILE_SIZE_MB = 20;
const MAX_FILE_SIZE_BYTES = MAX_FILE_SIZE_MB * 1024 * 1024;

const App: React.FC = () => {
  const [file, setFile] = useState<File | null>(null);
  const [transcription, setTranscription] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const handleFileSelect = (selectedFile: File | null) => {
    if (selectedFile) {
      if (selectedFile.size > MAX_FILE_SIZE_BYTES) {
        setError(`File is too large. Maximum size is ${MAX_FILE_SIZE_MB} MB.`);
        setFile(null);
      } else if (!selectedFile.type.startsWith('audio/')) {
        setError('Invalid file type. Please upload an audio file.');
        setFile(null);
      }
      else {
        setFile(selectedFile);
        setError(null);
        setTranscription(null);
      }
    } else {
      setFile(null);
    }
  };

  const handleTranscribe = useCallback(async () => {
    if (!file) {
      setError('Please select a file first.');
      return;
    }

    setIsLoading(true);
    setError(null);
    setTranscription(null);

    try {
      const result = await transcribeAudio(file);
      setTranscription(result);
    } catch (e) {
      console.error(e);
      setError(e instanceof Error ? `Transcription failed: ${e.message}` : 'An unknown error occurred.');
      setTranscription(null);
    } finally {
      setIsLoading(false);
    }
  }, [file]);
  
  const handleClear = () => {
    setFile(null);
    setTranscription(null);
    setError(null);
    setIsLoading(false);
  }

  return (
    <div className="min-h-screen bg-gray-900 text-white flex flex-col items-center justify-center p-4 sm:p-6 font-sans">
      <div className="w-full max-w-3xl mx-auto">
        <Header />
        <main className="bg-gray-800/50 backdrop-blur-sm rounded-2xl shadow-2xl shadow-teal-500/10 p-6 md:p-8 mt-6 border border-gray-700">
          {!transcription && !isLoading && (
            <FileUploader onFileSelect={handleFileSelect} file={file} error={error} />
          )}

          {error && !file && (
            <div className="mt-4 flex items-center justify-center text-red-400 bg-red-900/50 p-3 rounded-lg">
              <AlertTriangle className="w-5 h-5 mr-2" />
              <span>{error}</span>
            </div>
          )}

          {isLoading && <Loader />}
          
          {transcription && !isLoading && (
            <TranscriptionDisplay text={transcription} />
          )}

          <div className="mt-8 flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-4">
            <Button
              onClick={handleTranscribe}
              disabled={!file || isLoading}
            >
              {isLoading ? 'Transcribing...' : 'Transcribe'}
            </Button>
            {(file || transcription) && (
              <Button
                onClick={handleClear}
                disabled={isLoading}
                variant="secondary"
              >
                Clear
              </Button>
            )}
          </div>
        </main>
      </div>
    </div>
  );
};

export default App;
