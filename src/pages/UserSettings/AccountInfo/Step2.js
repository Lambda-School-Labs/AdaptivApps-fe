// React/Reach Router imports
import React from "react";
import { useForm, Controller } from "react-hook-form";
import { useParams, useNavigate } from "@reach/router";
// Component imports
import NextButton from "../../../theme/FormButton";
import ProgressBar from "../../../theme/ProgressBar";
// Material-UI imports
import {
  makeStyles,
  Typography,
  Box,
  InputLabel,
  TextField,
  Select,
  MenuItem,
} from "@material-ui/core";

const useStyles = makeStyles({
  root: {
    display: "flex",
    flexDirection: "column",
    width: "80%",
    "& .MuiInputLabel-asterisk": {
      fontSize: '2rem',
      color: 'red',
      fontWeight: 'bolder'
    }
  },
  form: {
    display: "flex",
    flexDirection: "column",
    "& .MuiTextField-root": {
      width: 744,
      height: 48,
    },
  },
  genderBirthBox: {
    display: "flex",
    "& .MuiTextField-root": {
      width: 360,
      height: 48,
    },
    marginBottom: "1.2rem",
  },
  shortSelect: {
    width: 360,
    marginRight: "2.4rem",
  },
  longSelect: {
    marginBottom: "2.4rem",
  },
  ecfield: {
    margin: "1.2rem 0",
  },
  btnBox: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: 'center',
    marginTop: "11.2rem",
  },
  error: {
    color: 'red',
    fontSize: '1.75rem',    
    fontVariant: 'all-small-caps',
    fontWeight: 'bold',
    marginTop: '1rem'
  }
});

export default function Step2({ updateExtProfile }) {
  const classes = useStyles();
  const navigate = useNavigate();
  const { userEmail } = useParams();
  const { handleSubmit, errors, control } = useForm();

  const onSubmit = async data => {
    await updateExtProfile({
      variables: {
        email: userEmail,
        gender: data.gender,
        birthday: data.birthday,
        eC1Name: data.eC1Name,
        eC1Phone: data.eC1Phone,
        eC1Relation: data.eC1Relation,
        physicalDisability: data.physicalDisability,
        detailedDisabilities: data.detailedDisabilities,
        mobilityStatus: data.mobilityStatus,
      },
    });
    alert("Succesfully completed step 2 of account info update!");
    await navigate(`/updateaccount/${userEmail}/step3of6`);
  };

  return (
    <Box className={classes.root}>
      <ProgressBar activeStep={2} stepNumber={2} userEmail={userEmail} />
      <form className={classes.form} onSubmit={handleSubmit(onSubmit)}>
        <Box className={classes.genderBirthBox}>
          <Box>
            <InputLabel required htmlFor="gender">
              Please select gender
            </InputLabel>
            <Controller
              as={
                <Select className={classes.shortSelect}>
                  <MenuItem value="Male">Male</MenuItem>
                  <MenuItem value="Female">Female</MenuItem>
                  <MenuItem value="Other">Other</MenuItem>
                </Select>
              }
              name="gender"
              type="select"
              variant="outlined"
              control={control}
              defaultValue=""
              rules={{ required: true }}
            />
            {errors.gender && <Typography className={classes.error}>gender is a required field</Typography>}
          </Box>
          <Box>
            <InputLabel required htmlFor="birthday">
              Please enter your birthday
            </InputLabel>
            <Controller
              as={<TextField />}
              name="birthday"
              type="date"
              variant="outlined"
              control={control}
              defaultValue=""
              rules={{ required: true }}
            />
            {errors.birthday && <Typography className={classes.error}>birthday is a required field</Typography>}
          </Box>
        </Box>
        <Box className={classes.ecfield}>
        <InputLabel required htmlFor="eC1Name">
          Please enter the name of your emergency contact
        </InputLabel>
        <Controller
          as={<TextField />}
          name="eC1Name"
          type="text"
          variant="outlined"
          control={control}
          defaultValue=""
          rules={{ required: true }}
        />
        {errors.eC1Name && <Typography className={classes.error}>emergency contact is a required field</Typography>}
        </Box>
        <Box className={classes.ecfield}>
        <InputLabel required htmlFor="eC1Relation">
          Please tell us how your emergency contact is related to you
        </InputLabel>
        <Controller
          as={<TextField />}
          name="eC1Relation"
          type="text"
          variant="outlined"
          control={control}
          defaultValue=""
          rules={{ required: true }}
        />
        {errors.eC1Relation && <Typography className={classes.error}>emergency contact relation is a required field</Typography>}
        </Box>
        <Box className={classes.ecfield}>
        <InputLabel required htmlFor="eC1Phone">
          Please enter the best phone number for your emergency contact
        </InputLabel>
        <Controller
          as={<TextField />}
          name="eC1Phone"
          type="text"
          variant="outlined"
          control={control}
          defaultValue=""
          rules={{ required: true }}
        />
        {errors.eC1Phone && <Typography className={classes.error}>emergency contact phone number is a required field</Typography>}
        </Box>
        <InputLabel htmlFor="physicalDisability">
          Please select the category of physical disability that is most
          accurate for you
        </InputLabel>
        <Controller
          as={
            <Select className={classes.longSelect}>
              <MenuItem value="Ataxia">Ataxia</MenuItem>
              <MenuItem value="Hearing Impairment">Hearing Impairment</MenuItem>
              <MenuItem value="Hypertonia">Hypertonia</MenuItem>
              <MenuItem value="Impaired Muscle Power">
                Impaired Muscle Power
              </MenuItem>
              <MenuItem value="Impaired Passive Range">
                Impaired Passive Range
              </MenuItem>
              <MenuItem value="Intellectual Impairment">
                Intellectual Impairment
              </MenuItem>
              <MenuItem value="Leg Length Discrepancy">
                Leg Length Discrepancy
              </MenuItem>
              <MenuItem value="Limb Deficiency">Limb Deficiency</MenuItem>
              <MenuItem value="Short Stature">Short Stature</MenuItem>
              <MenuItem value="Vision Impairment">Vision Impairment</MenuItem>
              <MenuItem value="None">
                I do not have a disability/impairment
              </MenuItem>
            </Select>
          }
          name="physicalDisability"
          type="select"
          variant="outlined"
          control={control}
          defaultValue=""
        />
        <InputLabel htmlFor="detailedDisabilities">
          Please select the specific disability diagnosis that is most accurate
          for you
        </InputLabel>
        <Controller
          as={
            <Select className={classes.longSelect}>
              <MenuItem value="ALS">ALS</MenuItem>
              <MenuItem value="Amputation">Amputation</MenuItem>
              <MenuItem value="Arthogyposis">Arthogyposis</MenuItem>
              <MenuItem value="Brachial Plexus Injury">
                Brachial Plexus Injury
              </MenuItem>
              <MenuItem value="Cauda Equina Syndrome">
                Cauda Equina Syndrome
              </MenuItem>
              <MenuItem value="Cerebral Palsy">Cerebral Palsy</MenuItem>
              <MenuItem value="Arthritis">Arthritis</MenuItem>
              <MenuItem value="Charcot Marie Tooth">
                Charcot Marie Tooth
              </MenuItem>
              <MenuItem value="Drop Foot">Drop Foot</MenuItem>
              <MenuItem value="Dwarfism">Dwarfism</MenuItem>
              <MenuItem value="Ehlers Danlos Syndrome">
                Ehlers Danlos Syndrome
              </MenuItem>
              <MenuItem value="Fibromyalgia">Fibromyalgia</MenuItem>
              <MenuItem value="Guillain-Barre Syndrome">
                Guillain-Barre Syndrome
              </MenuItem>
              <MenuItem value="Multiple Sclerosis">Multiple Sclerosis</MenuItem>
              <MenuItem value="Muscular Dystrophy">Muscular Dystrophy</MenuItem>
              <MenuItem value="Osteogenesis Imperfecta">
                Osteogenesis Imperfecta
              </MenuItem>
              <MenuItem value="Osteoporosis">Osteoporosis</MenuItem>
              <MenuItem value="Parkinsons">Parkinsons</MenuItem>
              <MenuItem value="Polio">Polio</MenuItem>
              <MenuItem value="Prader Willi Syndrome">
                Prader Willi Syndrome
              </MenuItem>
              <MenuItem value="Spina Bifida">Spina Bifida</MenuItem>
              <MenuItem value="Paraplegia">Paraplegia</MenuItem>
              <MenuItem value="Quadraplegia">Quadraplegia</MenuItem>
              <MenuItem value="TBI">TBI</MenuItem>
              <MenuItem value="Other">Other</MenuItem>
              <MenuItem value="None">None</MenuItem>
              <MenuItem value="N/A">
                I choose not to answer this question
              </MenuItem>
            </Select>
          }
          name="detailedDisabilities"
          type="select"
          variant="outlined"
          control={control}
          defaultValue=""
        />
        <InputLabel htmlFor="mobilityStatus">
          Please select the mobility status that is most accurate for you
        </InputLabel>
        <Controller
          as={
            <Select>
              <MenuItem value="I walk independently">
                I walk independently
              </MenuItem>
              <MenuItem value="I walk with an assistive device">
                I walk with an assistive device
              </MenuItem>
              <MenuItem value="I use a manual wheelchair">
                I use a manual wheelchair
              </MenuItem>
              <MenuItem value="I use a power chair">
                I use a power chair
              </MenuItem>
            </Select>
          }
          name="mobilityStatus"
          type="select"
          variant="outlined"
          control={control}
          defaultValue=""
        />
        <Box className={classes.btnBox}>
        <Typography className={classes.error}>* required field</Typography>
          <NextButton
            label="Next"
            type="submit"
            onClick={handleSubmit}
            ariaLabel="Click here to complete step 2 and move onto step 3 of account information update."
          />
        </Box>
      </form>
    </Box>
  );
}
