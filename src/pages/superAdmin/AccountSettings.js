import { useEffect } from "react";
import "../../styles/Settings.css";
import Header from "../../components/header/Header";
import useDialog from "../../hooks/useDialog";
import "../../styles/ctas.css";
import { Formik, ErrorMessage, Form } from "formik";
import { toBase64 } from "helpers/toBase64";
import getImageDimensions from "helpers/getImageDimensions";
import * as Yup from 'yup';
import { getStorage, ref, uploadString, getDownloadURL } from "firebase/storage";
import useAuth from "contexts/Auth";

function AccountSettings() {
  const [ show ] = useDialog();
  const { logo, favicon, setLogo, setFavicon, logoSm, setLogoSm } = useAuth()

  useEffect(() => {
    downloadFavicon();
    return () => {};

  }, [ show ]);

  const downloadFavicon = () =>  {
    const storage = getStorage()
    getDownloadURL(ref(storage, 'icons/favicon.ico'))
      .then((url) => {
        console.log(url)
      })
  }

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
            faviconURL: null,
            logoSm: null
          }}
          onSubmit={ async ({ logoURL, faviconURL, logoSm }, resetForm) => {
            const logos = { logo: logoURL, favicon: faviconURL }
            console.log(logos)
            const storage = getStorage()
            const logoRef = ref(storage, 'icons/logo.png')
            const faviconRef = ref(storage, 'icons/favicon.ico')
            const smallLogoRef = ref(storage, 'icons/logoSm.png')

            if ( faviconURL ) {
              uploadString(faviconRef, faviconURL, 'data_url')
                .then(({ ref }) => {
                  console.log('Successfully Uploaded the favicon');
                  if( ref ) {
                    getDownloadURL(ref)
                      .then( url => setFavicon(() => url ))
                  }
                })
                .catch((error) => {
                  console.log(error)
                });
            } 

            if ( logoURL ) {
              uploadString(logoRef, logoURL, 'data_url')
                .then(({ ref }) => {
                  if(ref) {
                    getDownloadURL(ref)
                      .then( url => setLogo(() => url ))
                  }
                })
                .catch((error) => {
                  console.log(error)
                });
            } 

            if ( logoSm ) {
              uploadString(smallLogoRef, logoSm, 'data_url')
                .then(({ ref }) => {
                  if(ref) {
                    getDownloadURL(ref)
                      .then( url => setLogoSm(() => url ))
                  }
                })
                .catch((error) => {
                  console.log(error)
                });
            } 
          }}
          validationSchema={
            Yup.object().shape({
              logoURL: Yup.mixed()
              .test('either_logo', 'At least one of the icons is required', ( value, { createError, parent: { faviconURL, logoSm }} ) => {
                return !faviconURL && !value && !logoSm ? createError({ message:"At least one of the icons is required." }) : true;
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
              .test('either_favicon', 'The width and height should be equal', ( value, { createError, parent: { logoURL, logoSm }} ) => {
                return !logoURL && !value && !logoSm ? createError({ message:"At least one of the icons is required." }) : true;
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
              }),
              logoSm: Yup.mixed()
              .test('either_favicon', 'The width and height should be equal', ( value, { createError, parent: { logoURL, faviconURL }} ) => {
                return !logoURL && !value && !faviconURL ? createError({ message:"At least one of the icons is required." }) : true;
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
                    
                    return createError({ message: "Small Logo should not exceed 2MBs" })
                  } else {
                    return true
                  }
                } else return true
              })
            }
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
                <h3 className="mb-2">Logo SM</h3>
                <div className="tw-flex tw-flex-wrap tw-gap-3">
                  <div className="tw-h-12 tw-w-12 mb-3 tw-outline tw-outline-1 tw-flex tw-justify-center tw-items-center">
                    <img src={logoSm} alt="sm logo" />
                  </div>
                  {values?.logoSm && (
                    <div className="tw-h-12 tw-w-12 mb-3 tw-outline tw-outline-1 tw-flex tw-justify-center tw-items-center">
                      <img
                        src={values?.logoSm}
                        alt="system icon"
                        className="tw-h-full"
                      />
                    </div>
                  )}
                </div>
              </div>
              <div className="tw-flex tw-flex-wrap tw-gap-2">
                <label>Small Logo</label>
                <input
                  name="logoSm"
                  type="file"
                  className="appearance-none tw-z-20 "
                  onChange={async (event) => {
                      const dataURL = await toBase64(event.target.files[0])
                      setFieldValue('logoSm', dataURL)
                    }
                  }
                  accept="image/vnd.microsoft.icon,image/png"
                  onBlur={handleBlur("faviconURL")}
                />
              </div>
              <ErrorMessage name="logoSm">{msg => <div style={{color:"red", fontSize:"12px"}}>{msg}</div>}</ErrorMessage>


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
              <ErrorMessage name="faviconURL">{msg => <div style={{color:"red", fontSize:"12px"}}>{msg}</div>}</ErrorMessage>
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
