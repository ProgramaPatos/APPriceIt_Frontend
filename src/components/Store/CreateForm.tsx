import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";
    
function Create(): JSX.Element {
  let navigate = useNavigate();
  const { user, getIdTokenClaims } = useAuth0();
    
  interface IValues {
    [key: string]: any;
  }
  const [author, setAuthor] = useState<string>('');
  const [values, setValues] = useState<IValues>([]);
  const [submitSuccess, setSubmitSuccess] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
    
  useEffect(() => {
    if (user && user.name) {
      setAuthor(user.name)
    }
  }, [user]);
  const handleFormSubmission = async (e: React.FormEvent<HTMLFormElement>): Promise<void> => {
    e.preventDefault();
    setLoading(true);
    const formData = {
        //TODO: update form data
      store_name: values.store_name,
      store_lon: values.store_lon,
      store_lat: values.store_lat,
      store_description: values.store_description,
      store_schedule: values.store_shedule,
      author,
    };
    const submitSuccess: boolean = await submitform(formData);
    setSubmitSuccess(submitSuccess);
    setValues({...values, formData});
    setLoading(false);
    setTimeout(() => {
      navigate('/');
    }, 1500);
  }
    
  const submitform = async (formData: {}) => {
    try {
      const accessToken = await getIdTokenClaims();
      if(!accessToken) return false;
      const response = await fetch(`${process.env.REACT_APP_SERVER_BASE_URL}/stores/create`, {
        method: "post",
        headers: new Headers({
          "Content-Type": "application/json",
          "Accept": "application/json",
          "authorization": `Bearer ${accessToken.__raw}`
        }),
        body: JSON.stringify(formData)
      });
      return response.ok;
    } catch (ex) {
      return false;
    }
  }
  const setFormValues = (formValues: IValues) => {
    setValues({...values, ...formValues})
  }
  const handleInputChanges = (e: React.FormEvent<HTMLInputElement>) => {
    e.preventDefault();
    setFormValues({ [e.currentTarget.name]: e.currentTarget.value })
  }  
  return (
    <div>
    <div className={"col-md-12 form-wrapper"}>
      <h2> Create Post </h2>
      {!submitSuccess && (
        <div className="alert alert-info" role="alert">
          Fill the form below to create a new post.
                </div>
      )}
      {submitSuccess && (
        <div className="alert alert-info" role="alert">
          The form was successfully submitted!
                        </div>
      )}
      <form id={"create-post-form"} onSubmit={handleFormSubmission} noValidate={true}>
        <div className="form-group col-md-12">
          <label htmlFor="Store_Name"> Store Name </label>
          <input 
            type="text" 
            id="store_name" 
            onChange={(e) => handleInputChanges(e)} 
            name="title" 
            className="form-control" 
            placeholder="Enter title" 
            />
        </div>
        <div className="form-group col-md-12">
          <label htmlFor="lon"> Longitud </label>
          <input 
            type="number" 
            id="store_lon" 
            onChange={(e) => handleInputChanges(e)} 
            name="longitud" 
            className="form-control" 
            placeholder="Enter longitud" 
          />
        </div>
        <div className="form-group col-md-12">
          <label htmlFor="lat"> Latitud </label>
          <input type="number" id="store_lat" onChange={(e) => handleInputChanges(e)} name="body" className="form-control" placeholder="Enter content" />
        </div>
        <div className="form-group col-md-12">
          <label htmlFor="description"> Description </label>
          <input type="text" id="store_description" onChange={(e) => handleInputChanges(e)} name="description" className="form-control" placeholder="Enter Description" />
        </div>
        <div className="form-group col-md-12">
          <label htmlFor="schedule"> Schedule </label>
          <input type="text" id="store_schedule" onChange={(e) => handleInputChanges(e)} name="description" className="form-control" placeholder="Enter Description" />
        </div>
        <div className="form-group col-md-12">
          <label htmlFor="author"> Author </label>
          <input type="text" id="store_appuser_id" defaultValue={author} onChange={(e) => handleInputChanges(e)} name="author" className="form-control" />
        </div>
        <div className="form-group col-md-4 pull-right">
          <button className="btn btn-success" type="submit">
            Create Post
          </button>
          {loading &&
            <span className="fa fa-circle-o-notch fa-spin" />
          }
        </div>
      </form>
    </div>
  </div>
    );
    
}
export default Create;