"use client";

import { useEffect, useState } from "react";

import DashboardLayout from "@/components/layout/DashboardLayout";

import {
  Ambulance,
  Phone,
  MapPin,
  ShieldAlert,
  HeartPulse,
  Siren,
  Hospital,
  Navigation,
  Loader2,
  Bot,
  Send,
  Sparkles,
} from "lucide-react";

import { sendMessage } from "@/services/aiService";


interface HospitalData {
  id: string;
  name: string;
  address: string;
  latitude: number;
  longitude: number;
  phone?: string;
}



export default function EmergencyPage() {


  const [loadingLocation, setLoadingLocation] =
    useState(false);


  const [location, setLocation] = useState<{
    latitude: number;
    longitude: number;
  } | null>(null);



  const [locationMessage, setLocationMessage] =
    useState("");



  const [sosSent, setSosSent] =
    useState(false);



  const [emergencyContact, setEmergencyContact] =
    useState({
      name: "",
      phone: "",
    });



  const [hospitals, setHospitals] =
    useState<HospitalData[]>([]);



  const [loadingHospitals, setLoadingHospitals] =
    useState(false);



  const [aiQuestion, setAiQuestion] =
    useState("");



  const [aiResponse, setAiResponse] =
    useState("");



  const [loadingAI, setLoadingAI] =
    useState(false);





  useEffect(() => {

    const savedContact =
      localStorage.getItem(
        "emergencyContact"
      );


    if(savedContact){

      setEmergencyContact(
        JSON.parse(savedContact)
      );

    }


    getLocation();


  }, []);





  const getLocation = () => {


    if(!navigator.geolocation){

      setLocationMessage(
        "Location is not supported on this device."
      );

      return;

    }



    setLoadingLocation(true);



    navigator.geolocation.getCurrentPosition(

      (position)=>{


        const currentLocation = {

          latitude:
            position.coords.latitude,

          longitude:
            position.coords.longitude,

        };



        setLocation(
          currentLocation
        );



        setLocationMessage(
          "Location detected successfully."
        );



        fetchHospitals(
          currentLocation.latitude,
          currentLocation.longitude
        );


        setLoadingLocation(false);


      },


      ()=>{


        setLocationMessage(
          "Unable to get location. Please allow permission."
        );


        setLoadingLocation(false);


      }

    );


  };





  const fetchHospitals = async (
    latitude:number,
    longitude:number
  )=>{


    try{


      setLoadingHospitals(true);



      const response =
        await fetch(
          `http://localhost:5000/api/hospitals?lat=${latitude}&lng=${longitude}`
        );



      const data =
        await response.json();



      if(data.success){

        setHospitals(
          data.hospitals.slice(0,3)
        );

      }



    }catch(error){

      console.log(error);

    }finally{

      setLoadingHospitals(false);

    }


  };





  const sendSOS = ()=>{


    if(!location){


      alert(
        "Please enable location first."
      );


      return;

    }



    const message =

`🚨 MEDICAL EMERGENCY ALERT 🚨

I need urgent medical assistance.

My location:

https://maps.google.com/?q=${location.latitude},${location.longitude}`;



    navigator.clipboard.writeText(
      message
    );



    setSosSent(true);


  };





  const callAmbulance = ()=>{


    window.location.href =
      "tel:112";


  };





  const callContact = ()=>{


    if(emergencyContact.phone){


      window.location.href =
        `tel:${emergencyContact.phone}`;


    }else{


      alert(
        "Please add an emergency contact first."
      );


    }


  };





  const saveContact = ()=>{


    localStorage.setItem(
      "emergencyContact",
      JSON.stringify(
        emergencyContact
      )
    );


    alert(
      "Emergency contact saved."
    );


  };





  const askEmergencyAI = async ()=>{


    if(!aiQuestion.trim())
      return;



    setLoadingAI(true);



    try{


      const response =
        await sendMessage(

`You are MediNexa Emergency Assistant.

Provide safe first aid guidance.
Do not diagnose.
Always encourage contacting emergency services.

Question:
${aiQuestion}`

        );



      setAiResponse(
        response.reply
      );


    }catch{


      setAiResponse(
        "Unable to connect to emergency AI."
      );


    }



    setLoadingAI(false);


  };



  return (

    <DashboardLayout>

      <div className="space-y-8">

        {/* HERO SECTION */}

        <div className="rounded-3xl bg-gradient-to-r from-red-700 via-red-600 to-orange-500 p-8 text-white shadow-xl">

          <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">


            <div>

              <div className="flex items-center gap-4">

                <div className="rounded-3xl bg-white/20 p-4 backdrop-blur">

                  <Siren size={45} />

                </div>


                <div>

                  <h1 className="text-4xl font-bold">
                    Emergency SOS
                  </h1>


                  <p className="mt-2 text-red-100">
                    Get immediate help during a medical emergency.
                  </p>

                </div>


              </div>


              <p className="mt-5 max-w-2xl leading-8 text-red-50">

                Quickly access emergency contacts,
                ambulance services, nearby hospitals,
                and AI-powered first aid guidance.

              </p>


            </div>



            <div className="hidden lg:block">

              <div className="rounded-3xl bg-white/20 p-8 backdrop-blur">

                <HeartPulse size={90}/>

              </div>

            </div>


          </div>

        </div>





        {/* SOS AND QUICK ACTIONS */}


        <div className="grid gap-6 lg:grid-cols-3">



          {/* SOS CARD */}


          <div className="rounded-3xl bg-red-600 p-8 text-white shadow-lg">


            <Siren size={50}/>



            <h2 className="mt-5 text-3xl font-bold">

              Send SOS Alert

            </h2>



            <p className="mt-3 leading-7 text-red-100">

              Share your emergency location instantly
              so someone can assist you faster.

            </p>




            <button

              onClick={sendSOS}

              className="mt-8 w-full rounded-2xl bg-white py-4 font-bold text-red-600 transition hover:bg-red-100"

            >

              {sosSent
                ? "SOS MESSAGE READY ✓"
                : "SEND SOS ALERT"}

            </button>




            {sosSent && (

              <p className="mt-4 rounded-xl bg-white/20 p-3 text-sm">

                Emergency message copied.
                Share it with emergency services
                or your trusted contact.

              </p>

            )}



          </div>





          {/* CONTACT CARD */}



          <div className="rounded-3xl border bg-white p-6 shadow-lg">


            <Phone
              size={40}
              className="text-emerald-600"
            />



            <h2 className="mt-5 text-2xl font-bold">

              Emergency Contact

            </h2>




            <input

              value={emergencyContact.name}

              onChange={(e)=>
                setEmergencyContact({

                  ...emergencyContact,

                  name:e.target.value,

                })
              }

              placeholder="Contact name"

              className="mt-5 w-full rounded-xl border p-3 outline-none focus:ring-2 focus:ring-emerald-500"

            />




            <input

              value={emergencyContact.phone}

              onChange={(e)=>
                setEmergencyContact({

                  ...emergencyContact,

                  phone:e.target.value,

                })
              }

              placeholder="Phone number"

              className="mt-3 w-full rounded-xl border p-3 outline-none focus:ring-2 focus:ring-emerald-500"

            />





            <button

              onClick={saveContact}

              className="mt-4 w-full rounded-xl bg-emerald-600 py-3 font-semibold text-white hover:bg-emerald-700"

            >

              Save Contact

            </button>





            <button

              onClick={callContact}

              className="mt-3 w-full rounded-xl border border-emerald-600 py-3 font-semibold text-emerald-700 hover:bg-emerald-50"

            >

              Call Contact

            </button>



          </div>






          {/* AMBULANCE CARD */}



          <div className="rounded-3xl border bg-white p-6 shadow-lg">


            <Ambulance

              size={40}

              className="text-red-600"

            />



            <h2 className="mt-5 text-2xl font-bold">

              Ambulance

            </h2>



            <p className="mt-3 leading-7 text-slate-500">

              Contact emergency medical services immediately.

            </p>




            <button

              onClick={callAmbulance}

              className="mt-8 w-full rounded-xl bg-red-600 py-3 font-semibold text-white transition hover:bg-red-700"

            >

              Call Emergency Services

            </button>



          </div>



        </div>        {/* LOCATION + MEDICAL INFORMATION */}


        <div className="grid gap-6 lg:grid-cols-2">



          {/* LOCATION CARD */}



          <div className="rounded-3xl border bg-white p-6 shadow-lg">


            <MapPin

              size={40}

              className="text-emerald-600"

            />



            <h2 className="mt-5 text-2xl font-bold">

              Current Location

            </h2>



            <p className="mt-3 text-slate-500">

              {locationMessage ||
                "Detecting your current location..."}

            </p>




            {loadingLocation && (

              <div className="mt-5 flex items-center gap-3 text-emerald-600">

                <Loader2
                  size={22}
                  className="animate-spin"
                />

                Getting location...

              </div>

            )}






            {location && (

              <div className="mt-5 rounded-2xl bg-emerald-50 p-4">


                <p className="text-sm text-slate-600">

                  Latitude:

                </p>


                <p className="font-semibold">

                  {location.latitude}

                </p>



                <p className="mt-3 text-sm text-slate-600">

                  Longitude:

                </p>


                <p className="font-semibold">

                  {location.longitude}

                </p>




                <button

                  onClick={()=>{

                    navigator.clipboard.writeText(

`My emergency location:

https://maps.google.com/?q=${location.latitude},${location.longitude}`

                    );

                    alert(
                      "Location copied."
                    );

                  }}

                  className="mt-5 flex w-full items-center justify-center gap-2 rounded-xl bg-emerald-600 py-3 text-white hover:bg-emerald-700"

                >

                  <Navigation size={18}/>

                  Share Location

                </button>



              </div>

            )}



          </div>







          {/* MEDICAL INFORMATION */}



          <div className="rounded-3xl border bg-white p-6 shadow-lg">


            <HeartPulse

              size={40}

              className="text-emerald-600"

            />



            <h2 className="mt-5 text-2xl font-bold">

              Medical Information

            </h2>




            <p className="mt-3 leading-7 text-slate-500">

              Your emergency medical details will appear
              here from your health profile.

            </p>




            <div className="mt-5 space-y-3 rounded-2xl bg-emerald-50 p-5">


              <p>

                🩸 Blood Group:
                <span className="ml-2 font-semibold">
                  Not available
                </span>

              </p>



              <p>

                ⚠️ Allergies:
                <span className="ml-2 font-semibold">
                  Not recorded
                </span>

              </p>




              <p>

                💊 Current Medication:
                <span className="ml-2 font-semibold">
                  Not available
                </span>

              </p>



            </div>



          </div>



        </div>







        {/* NEARBY HOSPITALS */}



        <div className="rounded-3xl border bg-white p-6 shadow-lg">


          <div className="flex items-center gap-3">


            <Hospital

              size={38}

              className="text-emerald-600"

            />



            <div>


              <h2 className="text-2xl font-bold">

                Nearby Emergency Hospitals

              </h2>



              <p className="text-slate-500">

                Find the closest healthcare facilities.

              </p>


            </div>


          </div>







          {loadingHospitals && (

            <div className="mt-8 flex justify-center">


              <Loader2

                size={35}

                className="animate-spin text-emerald-600"

              />


            </div>


          )}






          {!loadingHospitals &&
            hospitals.length === 0 && (

            <p className="mt-6 text-slate-500">

              No nearby hospitals found.

            </p>

          )}








          <div className="mt-6 grid gap-5 md:grid-cols-3">


            {hospitals.map((hospital)=>(


              <div

                key={hospital.id}

                className="rounded-2xl border p-5"


              >


                <h3 className="font-bold text-slate-800">

                  {hospital.name}

                </h3>



                <p className="mt-2 text-sm text-slate-500">

                  {hospital.address}

                </p>




                <button

                  onClick={()=>{

                    window.open(

`https://www.google.com/maps/dir/?api=1&destination=${hospital.latitude},${hospital.longitude}`,

                      "_blank"

                    );

                  }}

                  className="mt-5 flex w-full items-center justify-center gap-2 rounded-xl bg-emerald-600 py-3 text-white hover:bg-emerald-700"

                >

                  <Navigation size={18}/>

                  Directions

                </button>



              </div>


            ))}



          </div>



        </div>        {/* EMERGENCY AI ASSISTANT */}


        <div className="rounded-3xl border border-emerald-200 bg-gradient-to-r from-emerald-50 to-green-50 p-6 shadow-lg">


          <div className="flex items-start gap-4">


            <div className="rounded-2xl bg-emerald-600 p-3 text-white">


              <Bot size={32}/>


            </div>



            <div className="flex-1">


              <h2 className="text-2xl font-bold text-emerald-800">

                MediNexa Emergency AI Assistant

              </h2>



              <p className="mt-2 leading-7 text-slate-600">

                Get quick first-aid guidance and emergency
                information. MediNexa AI does not diagnose
                conditions or replace professional medical help.

              </p>



            </div>


          </div>





          <div className="mt-6 flex flex-col gap-4 md:flex-row">


            <input

              value={aiQuestion}

              onChange={(e)=>
                setAiQuestion(
                  e.target.value
                )
              }

              placeholder="Example: What should I do if someone faints?"

              className="flex-1 rounded-2xl border border-emerald-200 px-5 py-4 outline-none focus:ring-4 focus:ring-emerald-100"

            />




            <button

              onClick={askEmergencyAI}

              disabled={loadingAI}

              className="flex items-center justify-center gap-2 rounded-2xl bg-emerald-600 px-8 py-4 font-semibold text-white transition hover:bg-emerald-700 disabled:opacity-60"

            >


              {loadingAI ? (

                <>

                  <Loader2
                    size={20}
                    className="animate-spin"
                  />

                  Thinking...

                </>


              ) : (

                <>

                  <Send size={20}/>

                  Ask AI

                </>

              )}


            </button>



          </div>






          <div className="mt-5 flex flex-wrap gap-3">


            {[

              "What are stroke warning signs?",

              "How do I help someone choking?",

              "What should I do if someone faints?",

            ].map((question)=>(


              <button

                key={question}

                onClick={()=>{

                  setAiQuestion(question);

                }}

                className="rounded-full bg-white px-4 py-2 text-sm text-emerald-700 shadow-sm hover:bg-emerald-100"

              >

                {question}

              </button>



            ))}


          </div>






          {aiResponse && (

            <div className="mt-6 rounded-2xl border border-emerald-200 bg-white p-5">


              <div className="flex items-center gap-2">


                <Sparkles
                  size={20}
                  className="text-emerald-600"
                />


                <h3 className="font-bold">

                  MediNexa AI Guidance

                </h3>


              </div>




              <p className="mt-3 whitespace-pre-wrap leading-7 text-slate-700">

                {aiResponse}

              </p>



            </div>

          )}



        </div>








        {/* SAFETY NOTICE */}



        <div className="flex gap-4 rounded-3xl border border-yellow-200 bg-yellow-50 p-6">


          <ShieldAlert

            size={32}

            className="mt-1 text-yellow-600"

          />



          <div>


            <h3 className="text-lg font-bold text-yellow-700">

              Emergency Safety Notice

            </h3>



            <p className="mt-2 leading-7 text-slate-600">


              MediNexa AI helps you access emergency
              information, nearby healthcare facilities,
              and first-aid guidance. In a life-threatening
              situation, always contact emergency services
              immediately.


            </p>


          </div>


        </div>




      </div>


    </DashboardLayout>

  );

}