import { useEffect } from "react";
import { useState } from "react";
import { useAuthStore } from "../store/useAuthStore";
import { Camera } from "lucide-react";


const ProfilePage = () => {
  const {
    authUser,
    updateProfile,
    changePassword,
    deleteAccount,
  } = useAuthStore();

  const [isEditing, setIsEditing] = useState(false);

  const [fullName, setFullName] = useState(authUser?.fullName || "");
  const [bio, setBio] = useState(authUser?.bio || "");
  const [phone, setPhone] = useState(authUser?.phone || "");
  const [selectedImg, setSelectedImg] = useState(null);

  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");

  useEffect(() => {
  if (authUser) {
    setFullName(authUser.fullName || "");
    setBio(authUser.bio || "");
    setPhone(authUser.phone || "");
  }
    }, [authUser]);

  // IMAGE UPLOAD
  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.readAsDataURL(file);

    reader.onload = async () => {
      const base64Image = reader.result;
      setSelectedImg(base64Image);
      await updateProfile({ profilePic: base64Image });
    };
  };

  // SAVE PROFILE
  const handleSave = async () => {
    await updateProfile({
      fullName,
      bio,
      phone,
    });
    setIsEditing(false);
  };

  // CHANGE PASSWORD
  const handleChangePassword = async () => {
    await changePassword({
      currentPassword,
      newPassword,
    });
    setCurrentPassword("");
    setNewPassword("");
  };

  return (
    <div className="min-h-screen pt-20 bg-base-100">
      <div className="max-w-3xl mx-auto p-6">

        {/* HEADER CARD */}
        <div className="bg-gradient-to-r from-purple-500 to-indigo-500 h-40 rounded-t-2xl"></div>

        <div className="bg-base-200 rounded-b-2xl p-8 shadow-xl -mt-20">

          {/* AVATAR */}
          <div className="flex flex-col items-center">
            <div className="relative">
              <img
                src={selectedImg || authUser?.profilePic || "/avatar.png"}
                className="w-32 h-32 rounded-full border-4 border-white object-cover"
              />
              <label className="absolute bottom-0 right-0 bg-black p-2 rounded-full cursor-pointer">
                <Camera className="text-white w-4 h-4" />
                <input
                  type="file"
                  className="hidden"
                  accept="image/*"
                  onChange={handleImageUpload}
                />
              </label>
            </div>

            <h2 className="mt-4 text-xl font-bold">
              {authUser?.fullName}
            </h2>

            <p className="text-sm text-gray-500">
              {authUser?.email}
            </p>

            <button
              onClick={() => setIsEditing(!isEditing)}
              className="mt-4 px-4 py-2 bg-primary text-white rounded-lg"
            >
              {isEditing ? "Cancel" : "Edit Profile"}
            </button>
          </div>

          {/* EDIT SECTION */}
          {isEditing && (
            <div className="mt-8 space-y-4">

              <input
                type="text"
                placeholder="Full Name"
                className="w-full p-3 rounded-lg bg-base-100 border"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
              />

              <textarea
                placeholder="Bio"
                className="w-full p-3 rounded-lg bg-base-100 border"
                value={bio}
                onChange={(e) => setBio(e.target.value)}
              />

              <input
                type="text"
                placeholder="Phone"
                className="w-full p-3 rounded-lg bg-base-100 border"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
              />

              <button
                onClick={handleSave}
                className="w-full bg-green-600 text-white py-2 rounded-lg"
              >
                Save Changes
              </button>
            </div>
          )}

          {/* CHANGE PASSWORD */}
          <div className="mt-12 border-t pt-6">
            <h3 className="text-lg font-semibold mb-4">
              Change Password
            </h3>

            <div className="space-y-3">
              <input
                type="password"
                placeholder="Current Password"
                className="w-full p-3 rounded-lg bg-base-100 border"
                value={currentPassword}
                onChange={(e) => setCurrentPassword(e.target.value)}
              />

              <input
                type="password"
                placeholder="New Password"
                className="w-full p-3 rounded-lg bg-base-100 border"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
              />

              <button
                onClick={handleChangePassword}
                className="w-full bg-blue-600 text-white py-2 rounded-lg"
              >
                Update Password
              </button>
            </div>
          </div>

          {/* ACCOUNT INFO */}
          <div className="mt-12 border-t pt-6 text-sm">
            <p>
              Member Since:{" "}
              {authUser?.createdAt?.split("T")[0]}
            </p>
            <p>
              Account Status:{" "}
              <span className="text-green-500">
                {authUser?.accountStatus}
              </span>
            </p>
          </div>

          {/* DELETE ACCOUNT */}
          <div className="mt-8 border-t pt-6">
            <button
              onClick={deleteAccount}
              className="w-full bg-red-600 text-white py-2 rounded-lg"
            >
              Delete Account
            </button>
          </div>

        </div>
      </div>
    </div>
  );
};

export default ProfilePage;