import React, { useState } from 'react';
import { motion } from 'framer-motion';
import axios from 'axios';
import { CustomDesignDocument } from '../../types/types';
import { addOrEditDescription, addOrEditName } from '../../app/actions';

interface EditModalProps {
  design: CustomDesignDocument;
  modalContent: 'editName' | 'editDescription';
  closeModal: () => void;
}

const EditModal: React.FC<EditModalProps> = ({ design, modalContent, closeModal }) => {
  const [inputValue, setInputValue] = useState('');
  const [loading, setLoading] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setInputValue(e.target.value);
  };

  const generateAiDescription = async () => {
    setLoading(true);
    try {
      const response = await axios.get(`https://image-description-javascript.vercel.app/describe`, {
        params: {
          api_key: 'your_secret_key',
          image_url: design.image,
        },
      });
      setInputValue(response.data.description);
    } catch (error) {
      console.error('Error generating AI description:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async () => {
    setLoading(true);
    try {
      if (modalContent === 'editDescription') {
        await addOrEditDescription(design._id, inputValue);
      } else if (modalContent === 'editName') {
        await addOrEditName(design._id, inputValue);
      }
      closeModal();
    } catch (error) {
      console.error('Error saving changes:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50"
    >
      <div className="bg-neutral-900 p-6 rounded-lg shadow-lg w-96">
        <h2 className="text-lg font-bold mb-4">{modalContent === 'editName' ? 'Edit Name' : 'Edit Description'}</h2>
        {modalContent === 'editDescription' && (
          <button
            onClick={generateAiDescription}
            className="mb-4 bg-neutral-700 hover:bg-neutral-800 border-neutral-800 text-white py-2 px-4 rounded-lg transition"
            disabled={loading}
          >
            {loading ? 'Generating...' : 'Generate Description with AI'}
          </button>
        )}
        <textarea
          value={inputValue}
          onChange={handleInputChange}
          className="w-full h-32 p-2 bg-neutral-800 text-white rounded-lg"
          placeholder={modalContent === 'editName' ? 'Enter new name' : 'Enter new description'}
          disabled={loading}
        />
        <div className="flex justify-end mt-4">
          <button
            onClick={closeModal}
            className="mr-2 hover:bg-black bg-neutral-800 text-white py-2 px-4 rounded-lg transition"
          >
            Cancel
          </button>
          <button
            onClick={handleSave}
            className="hover:bg-black bg-neutral-800 text-white py-2 px-4 rounded-lg transition"
            disabled={loading}
          >
            {loading ? 'Saving...' : 'Save'}
          </button>
        </div>
      </div>
    </motion.div>
  );
};

export default EditModal;
