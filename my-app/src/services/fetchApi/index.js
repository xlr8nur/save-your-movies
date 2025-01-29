// POST METHOD
const postAPI = async (
    URL,
    body,
    method = "POST",
    headers = { "Content-Type": "application/json" }
  ) => {
    try {
      if (!process.env.NEXT_PUBLIC_API_URL || !URL) {
        throw new Error("URL erişilemedi!");
      }
      const data = await fetch(`${process.env.NEXT_PUBLIC_API_URL + URL}`, {
        method: method,
        headers: headers,
        body: JSON.stringify(body),
        cache: "no-store",
      })
        .then((res) => res.json())
        .catch((err) => console.log(err));
      return data;
    } catch (err) {
      throw new Error(`API isteği başarısız ${err}`);
    }
  };

  // GET METHOD
  const getAPI = async (
    URL,
    headers = { "Content-Type": "application/json" }
  ) => {
    const data = await fetch(`${process.env.NEXT_PUBLIC_API_URL + URL}`, {
      method: "GET",
      headers: headers,
      cache: "no-store",
    })
      .then((res) => res.json())
      .catch((err) => console.log(err));
    return data;
  };

  // DELETE METHOD
  const deleteAPI = async (
    URL,
    headers = { "Content-Type": "application/json" }
  ) => {
    const data = await fetch(`${process.env.NEXT_PUBLIC_API_URL + URL}`, {
      method: "DELETE",
      headers: headers,
    })
      .then((res) => res.json())
      .catch((err) => console.log(err));
    return data;
  };

  // PUT METHOD
  const putAPI = async (
    URL,
    body,
    method = "PUT",
    headers = { "Content-Type": "application/json" }
  ) => {
    try {
      if (!process.env.NEXT_PUBLIC_API_URL || !URL) {
        throw new Error("URL erişilemedi!");
      }
      const data = await fetch(`${process.env.NEXT_PUBLIC_API_URL + URL}`, {
        method: method,
        headers: headers,
        body: JSON.stringify(body),
      })
        .then((res) => res.json())
        .catch((err) => console.log(err));
      return data;
    } catch (err) {
      throw new Error(`API isteği başarısız ${err}`);
    }
  };
  export { postAPI, getAPI, deleteAPI, putAPI };