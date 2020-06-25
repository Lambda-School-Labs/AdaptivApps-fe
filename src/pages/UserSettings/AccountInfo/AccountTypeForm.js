// React/Reach Router imports
import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "@reach/router";
import { useForm, Controller } from "react-hook-form";
// Apollo/GraphQL imports
import { useQuery } from "react-apollo";
import { PROFILE_TYPE } from "../queries";
// Component imports
import NextButton from "../../../theme/SmallFormButton";
import ProgressBar from "../../../theme/ProgressBar";
// Material-UI imports
import {
  makeStyles,
  Typography,
  Box,
  InputLabel,
  Select,
  MenuItem,
} from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    flexDirection: "column",
    width: '90%',
    "& .MuiInputLabel-asterisk": {
      fontSize: '2rem',
      color: 'red',
      fontWeight: 'bolder',
      [theme.breakpoints.down("sm")]: {
        fontSize: '1.75rem'
      },
      [theme.breakpoints.down("xs")]: {
        fontSize: '1.25rem'
      },
    },
  },
  form: {
    maxwidth: "100%",
    width: "100%",
    display: "flex",
    flexDirection: "column",
  },
  em: {
    fontStyle: "italic",
    fontSize: "1.6rem"
  },
  selectContainer: {
    height: "80vh",
  },
  typeSelect: {
    width: "100%",
    height: "4.8rem",
    [theme.breakpoints.down("sm")]: {
      width: '90%',
      height: 48,
      margin: '3% auto',
    },
    [theme.breakpoints.down("xs")]: {
      width: '90%',
      height: 35,
      margin: '3%  auto'
    },
  },
  inputLabel: {
    [theme.breakpoints.down("sm")]: {
      fontSize: '1.5rem',
      margin: 'auto'
    },
    [theme.breakpoints.down("xs")]: {
      fontSize: '1.25rem',
      margin: 'auto'
    },
  },
  box: {
    display: "flex",
    flexDirection: "column",
    marginBottom: "1.6rem",
  },
  btnWrapper: {
    width: '100%',
    display: "flex",
    justifyContent: "space-between",
  },
  error: {
    color: 'red',
    fontSize: '1.75rem',    
    fontVariant: 'all-small-caps',
    fontWeight: 'bold',
    marginTop: '1rem'
  },
}));

export default function AccountTypeForm({ updateProfile }) {
  const classes = useStyles();
  const navigate = useNavigate();
  const { userEmail } = useParams();
  const { data: defaultInfo, loading } = useQuery(PROFILE_TYPE, {
    variables: { email: userEmail },
  });
  const [currentUserInfo, setCurrentUserInfo] = useState(defaultInfo);
  const { handleSubmit, setValue, control, errors } = useForm({
    defaultValues: {
      type: currentUserInfo && currentUserInfo?.profile?.type,
      roleIdentity: currentUserInfo && currentUserInfo?.profile?.roleIdentity
    }
  });

  // Sets default values in input fields with current user's info
  useEffect(() => {
    !loading && !currentUserInfo
      ? setCurrentUserInfo(defaultInfo)
      : setValue([
          {
            type: currentUserInfo && currentUserInfo?.profile?.type,
            
          },
          {
            roleIdentity: currentUserInfo && currentUserInfo?.profile?.extProfile?.roleIdentity
            
          },
        ]);
  }, [loading, currentUserInfo, defaultInfo, setValue]);

  console.log('Inside AccountType', currentUserInfo)
  const onSubmit = async data => {
    await updateProfile({
      variables: {
        type: data.type,
        roleIdentity: data.roleIdentity,
        email: userEmail,
      },
    });

    alert("Successfully updated account type!");
    data?.type === "Individual"
      ? await navigate(`/updateaccount/${userEmail}/step1of6`)
      : await navigate(`/updateaccount/${userEmail}/orginfo`);
  };

  return (
    <Box className={classes.root}>
      <ProgressBar activeStep={0} userEmail={userEmail} />
      <form className={classes.form} onSubmit={handleSubmit(onSubmit)}>
        <Box className={classes.selectContainer}>
          <InputLabel required htmlFor="account type">
            Are you registering as an individual or an organization?
          </InputLabel>
          {errors.type && <Typography className={classes.error}>Please make a selection</Typography>}
          <Box className={classes.box}>
            <Controller
              as={
                <Select className={classes.typeSelect}>
                  <MenuItem value="">
                    <em className={classes.em}>Please choose one</em>
                  </MenuItem>
                  <MenuItem value="Individual">
                    I'm registering as an individual
                  </MenuItem>
                  <MenuItem value="Organization">
                    I'm registering as an organization
                  </MenuItem>
                </Select>
              }
              name="type"
              variant="outlined"
              control={control}
              defaultValue=""
              rules={{ required: true }}
            />
          </Box>
          <InputLabel required htmlFor="role identity">
            Which role do you best identify with?
          </InputLabel>
          {errors.roleIdentity && <Typography className={classes.error}>Please make a selection</Typography>}
          <Box className={classes.roleBox}>
            <Controller
              as={
                <Select className={classes.typeSelect}>
                  <MenuItem value="">
                    <em className={classes.em}>Please choose one</em>
                  </MenuItem>
                  <MenuItem value="Athlete">Adaptive Athlete</MenuItem>
                  <MenuItem value="Ally/Volunteer">
                    Ally/Volunteer - I want to participate and will volunteer to
                    help promote.
                  </MenuItem>
                  <MenuItem value="Donor/Supporter">
                    Donor/Supporter - I want to participate and will donate or
                    help fundraise.
                  </MenuItem>
                </Select>
              }
              name="roleIdentity"
              variant="outlined"
              control={control}
              defaultValue=""
              rules={{ required: true }}
            />
          </Box>
        </Box>
        <Box className={classes.btnWrapper}>
        <Typography className={classes.error}>* required field</Typography>
          <NextButton
            type="submit"
            label={"Next"}
            ariaLabel="Click here to complete step 1 of update account information and move to step 2."
            onClick={handleSubmit}
            className={classes.btn}
          />
        </Box>
      </form>
    </Box>
  );
}

{/* <InputLabel className={classes.inputLabel} required htmlFor="account type">
          Are you registering as an individual or an organization?
        </InputLabel>
        {errors.type && <Typography className={classes.error}>Please make a selection</Typography>}
        <Box className={classes.box}>
          <Controller
            as={
              <Select className={classes.typeSelect}>
                <MenuItem value="Individual">
                  I'm registering as an individual
                </MenuItem>
                <MenuItem value="Organization">
                  I'm registering as an organization
                </MenuItem>
              </Select>
            }
            name="type"
            variant="outlined"
            control={control}
            defaultValue=""
            rules={{ required: true }}
          /> */}
