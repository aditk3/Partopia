import React from 'react';
import { useFormContext } from 'react-hook-form';

export default function Image(){
    const {register, formState: {errors}, watch, setValue} = useFormContext();

    const handleOnChange = (event) => {
      //reads data from a Blob or File object
      let reader = new FileReader();

      //reads the binary data and encode it as a base64 data url
      //appropriate for when we need to use this data for src in img tags
      //result in the reader.onload will contain this method's output
      console.log(event.target.files[0])
      reader.readAsDataURL(event.target.files[0])

      //onLoad -> no errors during reading and reading of file has completed 
      reader.onload = () => {
        console.log(reader)
        //when reading is complete from readAsDataURL, we can access the result
        //reader.result is used if the result is obtained w/o errors
        //will update the component's registered field asynchronusly
        setValue("img", reader.result);
      }

      
    }

    return (
        <>

        <div className='item3'>
           
            <label className="upload-img-style" htmlFor="img">Upload Image</label>
            <input
                style={{visibility:'hidden'}}
                type="file"
                id="img"
                accept="image/*"
                {
                  ...register("img", {
                    onChange: handleOnChange,
                  
                    validate: value => {
                      if(value instanceof String)
                      return  value.match(/data:image/)  || '* Invalid image file type'
                    }
                  }
                  )
                }

                 
                   
            ></input>
            <p className="validations img-alert">
                {errors.img && errors.img.message}
            </p>
           </div> 
           
           <div className="item3-5">
            <img className='img-preview-style' src={watch("img")} />
            </div>


        </>
    );
}