export const registerUser = createAsyncThunk(
  "formEntries/registerUser",
  async credentials => {
    const url = `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyA6MCrILR6Oz9A0El8za6cMxRTHQzosjI0`;

    const data = {
      email: credentials.email,
      password: credentials.password,
      returnSecureToken: true,
    };

    const headers = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    const result = await axios.post(url, data, headers);

    return result.data;
  }
);


extraReducers: {
    [registerUser.pending]: action => {
      console.log("pending");
      console.log(action.payload);
    },
    [registerUser.fulfilled]: action => {
      console.log("success");
      console.log(action.payload);
    },
    [registerUser.rejected]: action => {
      console.log('rejected');
      console.log(action.payload);
    },
  },