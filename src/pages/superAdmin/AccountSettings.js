import { useEffect, useState } from "react";
import "../../styles/Settings.css";
import Header from "../../components/header/Header";
import { db } from "../../helpers/firebase";
import useDialog from "../../hooks/useDialog";
import { getAuth } from "firebase/auth";
import { getDoc, doc } from "firebase/firestore";
import "../../styles/ctas.css";
import logo from "../../assets/imgs/SWICO-LOGO.png";
import favicon from "../../assets/imgs/favicon.ico";
import { updateIcons } from "helpers/uploadIcons";
import { Formik, ErrorMessage, Form } from "formik";
import { toBase64 } from "helpers/toBase64";
import * as Yup from 'yup';



function getImageDimensions (url) {
  return new Promise ( function (resolve, reject) {
    var image = new Image()
    image.onload = function(){
      resolve({ width: image.width, height: image.height})
    };
    image.src = url
  })
}

function AccountSettings() {
  const [show] = useDialog();
  const [/* meta */, setMeta] = useState({});
  const { currentUser } = getAuth();

  useEffect(() => {
    document.title = "User Profile - SWICO";
    getUserMeta();
    return () => {};
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [ show ]);

  const getUserMeta = async () => {
    const docRef = doc(db, "usermeta", currentUser.uid);
    const docSnap = await getDoc(docRef);
    setMeta(docSnap.data());
  };

  return (
    <div className="components">
      <Header title="System Settings" subtitle="CUSTOMIZE SYSTEM SETTINGS" />
      <div
        id="edit_profile"
        className="componentsData myProfile shadow-sm mb-3 mt-3"
      >
        <Formik
          initialValues={{
            logoURL: null,
            faviconURL: null
          }}
          onSubmit={async ({logoURL, faviconURL}, resetForm) => {
            const logos = { logo: logoURL, favicon: faviconURL }

            console.log("logos: ", logos)
            updateIcons(logos)
              .then( response => response.json())
              .then( ({ data, error }) => {
                if ( error ) throw error
                console.log(data)
              })
              .catch( error => console.log(error))

            

            // console.log("logos", logos)
            // fetch("/api/updateIcons", {
            //   method: "POST",
            //   headers: {
            //     "Content-Type": "application/json"
            //   },
            //   body: JSON.stringify(logos)
            // })
            // .then(response => response.json())
            // .then(data => console.log(data))


            
          }}
          validationSchema={
            Yup.object().shape({
              logoURL: Yup.mixed()
              .test('either_logo', 'At least one of the icons is required', ( value, { createError, parent: { faviconURL }} ) => {
                return !faviconURL && !value ? createError({ message:"At least one of the icons is required." }) : true;
              })
              .test('image_dimensions', 'Invalid logo dimensions', async ( value, { createError }) => {
                if( value?.length > 0) {
                  const { width, height } = await getImageDimensions(value)
                  if ( width > 512 || height > 250 ) {
                    console.log(width)
                    console.log(height)
                    return createError({ message: "Width and height should not exceed 512px and 250px respectively"})
                  } else if ( width > 512 ) {
                    return createError({ message: "Width should not exceed 512px"})
                  } else if ( height > 250 ) {
                    return createError({ message: "Height should not exceed 250px"})
                  }
                  else if ( atob(value.substr(22)).length * 0.000001 > 2 ) {
                    return createError({ message: "Logo should not exceed 2MBs" })
                  }
                  else {
                    return true
                  }
                } else return true
              }),
              faviconURL: Yup.mixed()
              .test('either_favicon', 'The width and height should be equal', ( value, { createError, parent: { logoURL }} ) => {
                return !logoURL && !value ? createError({ message:"At least one of the icons is required." }) : true;
              })
              .test('image_dimensions', 'Invalid favicon dimensions', async ( value, { createError }) => {
                if( value?.length > 0) {
                  const { width, height } = await getImageDimensions(value)
                  if ( width !== height ) {
                    return createError({ message: "The height and width shoud be the same" })
                  } else if ( width > 512 ) {
                    return createError({ message: "Width should not exceed 512px" })
                  } else if ( height > 512 ) {
                    return createError({ message: "Height should not exceed 250px" })
                  }
                  else if ( atob(value.substr(22)).length * 0.000001 > 2 ) {
                    
                    return createError({ message: "Favicon should not exceed 2MBs" })
                  } else {
                    return true
                  }
                } else return true
              })
            },
            [["logoURL", "faviconURL"]]
          )}
        > 
        {({ values, setFieldValue, handleBlur, errors, isValid, dirty }) => (
          <Form className="mt-3">
            <div className="tw-overfow-hidden mb-5 tw-flex tw-flex-col">
              <div>
                <h3 className="mb-2">Logo</h3>
                <div className="tw-flex tw-flex-wrap tw-gap-3">
                  <div className="tw-h-20 tw-w-20 mb-3 tw-outline tw-outline-1 tw-flex tw-justify-center tw-items-center">
                    <img src={logo} alt="system logo" />
                  </div>
                  {values?.logoURL && (
                    <div 
                      className="tw-h-20 tw-w-20 mb-3 tw-outline tw-outline-1 tw-flex tw-justify-center tw-items-center"
                      >
                      <img
                        src={values.logoURL}
                        alt="system logo"
                        className="tw-h-full"
                      />
                    </div>
                  )}
                </div>
              </div>
              <div className="tw-flex tw-flex-wrap tw-gap-2">
                <label>Change Logo</label>
                <input
                  name="logo"
                  type="file"
                  className="appearance-none tw-z-20 "
                  onChange={async (event) => {
                    const dataURL = await toBase64(event.target.files[0])
                    setFieldValue('logoURL', dataURL)
                  }}
                  accept="image/vnd.microsoft.icon,image/png"
                  onBlur={handleBlur("logo")}
                />
              </div>
              <ErrorMessage name="logoURL">{msg => <div style={{color:"red", fontSize:"12px"}}>{msg}</div>}</ErrorMessage>
              <div>
                <h3 className="mb-2">Favicon</h3>
                <div className="tw-flex tw-flex-wrap tw-gap-3">
                  <div className="tw-h-12 tw-w-12 mb-3 tw-outline tw-outline-1 tw-flex tw-justify-center tw-items-center">
                    <img src={favicon} alt="system icon" />
                  </div>
                  {values?.faviconURL && (
                    <div className="tw-h-12 tw-w-12 mb-3 tw-outline tw-outline-1 tw-flex tw-justify-center tw-items-center">
                      <img
                        src={values?.faviconURL}
                        alt="system icon"
                        className="tw-h-full"
                      />
                    </div>
                  )}
                </div>
              </div>
              <div className="tw-flex tw-flex-wrap tw-gap-2">
                <label>Change Favicon</label>
                <input
                  name="faviconURL"
                  type="file"
                  className="appearance-none tw-z-20 "
                  onChange={async (event) => {
                      const dataURL = await toBase64(event.target.files[0])
                      setFieldValue('faviconURL', dataURL)
                    }
                  }
                  accept="image/vnd.microsoft.icon,image/png"
                  onBlur={handleBlur("faviconURL")}
                />
              </div>
              <ErrorMessage name="favicon">{msg => <div style={{color:"red", fontSize:"12px"}}>{msg}</div>}</ErrorMessage>
            </div>
            <div>
              <h2 className="tw-text-lg tw-font-medium">System Name</h2>
              <h2>SWICO</h2>
            </div>
            <button
              type="submit"
              className="tw-bg-gray-900 tw-text-white tw-px-3 tw-py-2 tw-rounded tw-mt-5"
              // disabled={!(isValid && dirty)}
            >
              Submit
            </button>
          </Form>
        )}
        </Formik>
       
      </div>
    </div>
  );
}

export default AccountSettings;
