"use client";

import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import CustomFormField from "@/components/ui/globals/form-field";
import Member from "@/components/ui/members/member-global";
import { AccountFormSchema } from "@/lib/schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { FaCloudUploadAlt } from "react-icons/fa";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useCurrentUser } from "@/hooks/useCurrentUser";
import { FaCircleUser } from "react-icons/fa6";
import FormFile from "@/components/ui/globals/form-file";
import { useEffect, useRef, useState } from "react";
import { DevTool } from "@hookform/devtools";
import ActionModal from "@/components/ui/globals/action-modal";
import Image from "next/image";

const Account = () => {
  const { user, uploadProgress, uploadStatus, loading, updateUserProfile } =
    useCurrentUser();
  const form = useForm<z.infer<typeof AccountFormSchema>>({
    resolver: zodResolver(AccountFormSchema),
    defaultValues: {
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      phoneNumber: user.phoneNumber,
      profilePicture: "",
    },
  });

  const {
    formState: { isDirty },
    watch,
  } = form;

  const [avatarUrl, setAvatarUrl] = useState(user.profilePicture);
  const watchProfilePicture = watch("profilePicture");
  const picInputRef = useRef<HTMLInputElement | null>(null);
  const updateButtonRef = useRef<HTMLButtonElement | null>(null);

  useEffect(() => {
    if (watchProfilePicture) {
      const newAvatarUrl = URL.createObjectURL(watchProfilePicture);
      setAvatarUrl(newAvatarUrl);
      return () => URL.revokeObjectURL(newAvatarUrl);
    }
  }, [watchProfilePicture]);

  const onSubmit = async (data: z.infer<typeof AccountFormSchema>) => {
    setOpen(false);
    if (data.profilePicture) {
      setOpen2(true);
    }
    await updateUserProfile(data);
  };

  const handleFormReset = () => {
    form.reset();
    setAvatarUrl(user.profilePicture);
  };

  const [open, setOpen] = useState(false);
  const [open2, setOpen2] = useState(false);

  return (
    <div className="h-full flex flex-col items-center justify-center gap-32">
      <div className="w-full h-[15rem] gap-8 bg-emerald-700 relative">
        <div className="flex items-center justify-center gap-8 absolute -bottom-[45%] left-12">
          <Avatar className="w-[12rem] h-[12rem]">
            <AvatarImage src={user.profilePicture} alt="your profile image" />
            <AvatarFallback>
              <FaCircleUser className="w-full h-full text-gray-300" />
            </AvatarFallback>
          </Avatar>
          <div className="flex flex-col items-start justify-center text-slate-700 uppercase self-end pb-4">
            <span className="text-2xl font-semibold">ishimwe hugues</span>
            <span className="text-sm text-gray-400 font-medium">
              impala express
            </span>
          </div>
        </div>
      </div>
      <div className="w-full h-full flex items-stretch justify-between px-14 my-14">
        <div className="w-1/2 flex flex-col items-start justify-center gap-16">
          <span className="text-2xl text-emerald-500 font-semibold">
            My details
          </span>
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="w-full grid grid-cols-2 gap-12"
            >
              <CustomFormField
                name="firstName"
                control={form.control}
                label="First name"
                placeholder="your first name"
                inputStyles="text-base"
              />
              <CustomFormField
                name="lastName"
                control={form.control}
                label="Last name"
                placeholder="your last name"
                inputStyles="text-base"
              />
              <CustomFormField
                name="email"
                control={form.control}
                label="Email"
                placeholder="ishimwe....77@gmail.com"
                inputStyles="text-base"
              />
              <CustomFormField
                name="phoneNumber"
                control={form.control}
                label="Phone Number"
                placeholder="+250 789.....9"
                inputStyles="text-base"
              />

              <FormFile
                name="profilePicture"
                control={form.control}
                placeholder=""
                ref={picInputRef}
              />
              <Button
                type="submit"
                className="bg-emerald-600 hover:bg-emerald-500 mt-8 hidden"
                ref={updateButtonRef}
              >
                Save
              </Button>

              <ActionModal
                open={open}
                setOpen={setOpen}
                wrapperStyles="min-w-[35rem] py-2 pb-12"
                trigger={
                  <Button
                    type="button"
                    className="bg-emerald-600 hover:bg-emerald-500 mt-8"
                    disabled={!isDirty || loading}
                  >
                    Save
                  </Button>
                }
                actionContent={
                  <div className="w-full flex flex-col items-center justify-center gap-10">
                    <div className="w-full h-40 flex flex-col items-center justify-end gap-6 bg-[url('/account-bg.svg')] bg-account bg-no-repeat bg-top">
                      <span className="text-2xl font-bold text-center ">
                        Are you sure you want to update your profile?
                      </span>
                      <span className="text-base text-center text-gray-400">
                        Your profile will be updated on all NaviGO Platforms.
                      </span>
                    </div>
                    <div className="w-full flex flex-col items-center justify-center gap-6">
                      <Button
                        type="submit"
                        className="w-full bg-emerald-600 hover:bg-emerald-500"
                        onClick={() => updateButtonRef.current?.click()}
                      >
                        Update Profile
                      </Button>

                      <Button
                        type="submit"
                        className="w-full bg-gray-300 hover:bg-gray-300 text-black"
                      >
                        Cancel
                      </Button>
                    </div>
                  </div>
                }
              />
              <ActionModal
                open={open2}
                setOpen={setOpen2}
                wrapperStyles="min-w-[35rem] pb-12 pt-4 px-4"
                trigger={null}
                actionContent={
                  <div className="w-full flex flex-col items-center justify-center gap-10">
                    <Image
                      src={"/upload.svg"}
                      alt="upload progress icon"
                      width={250}
                      height={100}
                    />
                    <div className="flex flex-col items-center justify-center">
                      <span className="font-semibold text-xl">
                        {uploadStatus}
                      </span>
                      <span className="text-gray-500 font-medium">
                        Please wait for the new profile image to upload
                      </span>
                    </div>
                    <div className="w-full flex flex-col items-center justify-center gap-6">
                      <div className="w-full flex flex-col items-center">
                        <div className="w-full h-10 flex flex-col items-center justify-center relative px-8">
                          <div
                            className={`w-fit h-fit -top-4 absolute left-[${Math.round(uploadProgress * 0.9)}%]`}
                          >
                            <Image
                              src={"/progress-car.svg"}
                              alt="upload progress icon"
                              width={40}
                              height={10}
                            />
                          </div>
                          <div className="w-full h-2 rounded-full bg-gray-200">
                            <div
                              className={`w-[${uploadProgress}%] h-full rounded-full bg-emerald-600`}
                            ></div>
                          </div>
                        </div>
                        <span className="text-sm">{uploadProgress}%</span>
                      </div>
                      <Button
                        type="submit"
                        className="w-[87%] bg-gray-300 hover:bg-gray-300 text-black"
                        onClick={() => {
                          handleFormReset();
                          setOpen2(false);
                        }}
                      >
                        Cancel
                      </Button>
                    </div>
                  </div>
                }
              />
              <Button
                type="reset"
                className="bg-gray-400 hover:bg-gray-300 mt-8"
                disabled={!isDirty}
                onClick={handleFormReset}
              >
                Cancel
              </Button>
              <DevTool control={form.control} />
            </form>
          </Form>
        </div>
        <div className="w-1/2 flex justify-center gap-12 self-end h-[20rem]">
          <Avatar className="w-[4rem] h-[4rem]">
            <AvatarImage src={avatarUrl} alt="your profile image" />
            <AvatarFallback>
              <FaCircleUser className="w-full h-full text-gray-300" />
            </AvatarFallback>
          </Avatar>
          <Member
            header={<FaCloudUploadAlt className="text-9xl text-emerald-500" />}
            content={
              <span className="text-gray-500 text-xl text-center">
                Click to upload or Drag and Drop
              </span>
            }
            wrapperStyles="w-1/2 border border-dashed border-slate-300 bg-smallcards shadow-2xl shadow-shadow-500 transition-all duration-300 cursor-pointer hover:shadow-3xl hover:shadow-shadow-400 hover:border-slate-400 grid place-items-center"
            handleClick={() => picInputRef.current?.click()}
          />
        </div>
      </div>
    </div>
  );
};

export default Account;
