import { postLogin, postRegister } from "../../api/user";
import { saveUserToken } from "../../util/auth";

export async function action({ request }) {
  const data = await request.formData();
  const mode = data.get("mode");

  if (mode === "login") {
    const loginData = {
      email: data.get("email"),
      password: data.get("password"),
    };

    let error = "";

    if (loginData.email === "" || loginData.password === "") {
      error = "Vui lòng nhập đầy đủ thông tin!";
      return { error };
    }

    const response = await postLogin(loginData);

    if (response.status === 422 || response.status === 401) {
      error = response.message;
      return { error };
    }

    if (response.success) {
      saveUserToken(response.data.access_token, response.data.user);

      return {
        access_token: response.data.access_token,
        token_type: response.data.token_type,
        message: response.data.message,
        success: response.success,
        user: response.data.user,
        mode: "login",
      };
    }
  }

  if (mode === "signup") {
    const signUpData = {
      last_name: data.get("last_name"),
      first_name: data.get("first_name"),
      phone: data.get("phone"),
      email: data.get("email"),
      password: data.get("password"),
    };

    let error = "";

    const response = await postRegister(signUpData);

    if (response.status === 422 || response.status === 401) {
      error = response.message;
      return { error };
    }

    if (response.success) {
      return {
        message: response.data.message,
        success: response.success,
        mode: "signup",
      };
    }
  }
}
