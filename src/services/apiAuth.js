import supabase, { supabaseUrl } from "./supabase";

export async function signup({ fullName, email, password }) {
  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: {
        fullName,
        avatar: "",
      },
    },
  });
  if (error) throw new Error(error.message);
  return data;
}

export async function login({ email, password }) {
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });
  if (error) throw new Error(error.message);
  return data;
}

export async function getCurrentUser() {
  //gets session from the local storage
  const { data: session } = await supabase.auth.getSession();
  if (!session.session) return null;
  //if there is a session then fetch user from supabase
  const {
    data: { user },
    error,
  } = await supabase.auth.getUser();
  if (error) throw new Error(error.message);
  return user;
}

export async function logout() {
  const { error } = await supabase.auth.signOut();
  if (error) throw new Error(error.message);
}

export async function updateCurrentUser({ password, fullName, avatar }) {
  //1. Update password OR fullName

  const updateData = {};

  if (password) updateData.password = password;
  if (fullName) updateData.data = { fullName };

  const { data, error } = await supabase.auth.updateUser(updateData);
  if (error) throw new Error(error.message);
  if (!avatar) return data;

  //2. Upload the avatar image

  const fileName = `avatar=${data.user.id}-${Math.random()}`;
  const { storageError } = await supabase.storage
    .from("avatars")
    .upload(fileName, avatar);
  if (storageError) throw new Error(storageError.message);

  //3. Update avatar  in the user
  const { data: updatedUser, error2 } = await supabase.auth.updateUser({
    data: {
      avatar: `${supabaseUrl}/storage/v1/object/public/avatars//${fileName}`,
      fullName,
    },
  });
  if (error2) throw new Error(error2.message);
  return updatedUser;
}
