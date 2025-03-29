import { faPencilAlt } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from 'axios';

const ImageUpload = ({ image, onImageUpdate }) => {
  const handleUpdateImage = async (file) => {
    try {
      const formData = new FormData();
      formData.append('avatar', file);

      const response = await axios.post(
        'http://localhost:5000/api/v1/user/avatar',
        formData,
        {
          withCredentials: true,
          headers: { 'Content-Type': 'multipart/form-data' },
        }
      );

      if (response.data.success) {
        onImageUpdate(response.data.avatar);
      }
    } catch (error) {
      console.error('Error updating image:', error);
    }
  };

  return (
    <div className="relative">
      <img
        className="w-32 h-32 rounded-full object-cover border-4 border-[#410445]"
        src={image}
        alt="Profile"
      />
      <label className="absolute bottom-0 right-0 bg-[#410445] py-1 px-3 rounded-full cursor-pointer">
        <input
          type="file"
          className="hidden"
          onChange={(e) => {
            const file = e.target.files[0];
            if (file) handleUpdateImage(file);
          }}
          accept="image/*"
        />
        <FontAwesomeIcon icon={faPencilAlt} className="text-white w-3 h-3" />
      </label>
    </div>
  );
};

export default ImageUpload;
