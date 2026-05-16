"use client";

import { updateProfile } from "../actions/update-profile.action";
import { useState } from "react";
import { toast } from "sonner";
import { User, AlignLeft, ImageIcon, Camera } from "lucide-react";
import { CldUploadWidget } from "next-cloudinary";

export default function ProfileForm({ user }: any) {
  const [name, setName] = useState(user?.name || "");
  const [bio, setBio] = useState(user?.bio || "");
  const [image, setImage] = useState(user?.image || "");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    try {
      await updateProfile({ name, bio, image });
      toast.success("Profile updated successfully");
    } catch (err: any) {
      toast.error(err.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  }

  const inputStyles =
    "w-full bg-sanctuary-50/50 border border-sanctuary-100 rounded-2xl px-5 py-3 text-sm focus:outline-none focus:ring-4 focus:ring-sanctuary-100/50 transition-all placeholder:text-sanctuary-200";

  return (
    <form onSubmit={handleSubmit} className="grid md:grid-cols-2 gap-6">
      <div className="space-y-4">
        <div className="space-y-2">
          <label className="text-[10px] uppercase tracking-widest font-bold text-sanctuary-400 ml-1">
            Name
          </label>
          <div className="relative">
            <User
              className="absolute left-4 top-1/2 -translate-y-1/2 text-sanctuary-200"
              size={16}
            />
            <input
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="ሄኖክ"
              className={`${inputStyles} pl-12`}
            />
          </div>
        </div>

        <div className="space-y-2">
          <label className="text-[10px] uppercase tracking-widest font-bold text-sanctuary-400 ml-1">
            Mantra / Bio
          </label>
          <div className="relative">
            <AlignLeft
              className="absolute left-4 top-4 text-sanctuary-200"
              size={16}
            />
            <textarea
              value={bio}
              onChange={(e) => setBio(e.target.value)}
              placeholder="A quiet voice in a loud world..."
              className={`${inputStyles} pl-12 min-h-[100px] resize-none pt-3`}
            />
          </div>
        </div>
      </div>

      <div className="space-y-4">
        <label className="text-[10px] uppercase tracking-widest font-bold text-sanctuary-400">
          Profile Image
        </label>

        <div className="flex items-center gap-6">
          {/* The Preview */}
          <div className="w-20 h-20 rounded-full overflow-hidden border-2 border-sanctuary-100 shadow-inner bg-sanctuary-50">
            <img
              src={image || "/images/login-bg.jpg"}
              className="w-full h-full object-cover"
              alt="Preview"
            />
          </div>

          {/* The Upload Widget */}
          <CldUploadWidget
            uploadPreset="journal-demo-app" // create this in Cloudinary Settings > Upload
            onSuccess={(result: any) => {
              setImage(result?.info?.secure_url);
              toast.success("Image uploaded to the clouds");
            }}
          >
            {({ open }) => (
              <button
                type="button"
                onClick={() => open()}
                className="flex items-center gap-2 px-4 py-2 bg-white border border-sanctuary-200 rounded-xl text-[10px] font-bold uppercase tracking-widest hover:bg-sanctuary-50 transition-all"
              >
                <Camera size={14} />
                Change Photo
              </button>
            )}
          </CldUploadWidget>
        </div>
      </div>

      <div className="md:col-span-2 pt-4">
        <button
          type="submit"
          disabled={loading}
          className="w-full bg-sanctuary-600 text-white py-4 rounded-2xl font-bold text-[10px] uppercase tracking-[0.2em] hover:bg-sanctuary-700 transition-all disabled:opacity-50 shadow-lg"
        >
          {loading ? "Preserving Changes..." : "Commit Profile Changes"}
        </button>
      </div>
    </form>
  );
}
