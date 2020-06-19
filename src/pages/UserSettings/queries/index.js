import gql from "graphql-tag";
// Retrieves user profile type
export const PROFILE_TYPE = gql`
  query($email: String!) {
    profile(where: { email: $email }) {
      id
      type
    }
  }
`;

// Updates user profile used in Step 1 of Profile Wizard
export const UPDATE_USER_PROFILE = gql`
  mutation UpdateProfile(
    $email: String!
    $type: String
    $private: Boolean
    $firstName: String
    $lastName: String
    $userName: String
    $phoneNumber: String
    $state: String
    $city: String
    $bio: String
    $legal: String
  ) {
    updateProfile(
      where: { email: $email }
      data: {
        type: $type
        private: $private
        firstName: $firstName
        lastName: $lastName
        userName: $userName
        phoneNumber: $phoneNumber
        state: $state
        city: $city
        bio: $bio
        legal: $legal
      }
    ) {
      type
      private
      firstName
      lastName
      userName
      phoneNumber
      state
      city
      bio
      legal
      createdAt
      updatedAt
    }
  }
`;
// retrieves user profile to set default values in Step 1 of Profile Wizard
export const PROFILE_STEP_1 = gql`
  query($email: String!) {
    profile(where: { email: $email }) {
      id
      firstName
      lastName
      userName
      phoneNumber
      state
      city
      bio
      legal
    }
  }
`;

// Creating a profile
export const ADD_USER_PROFILE = gql`
  mutation createProfile($email: String!) {
    createProfile(data: { email: $email }) {
      email
    }
  }
`;

// Retrieves user profile
export const PROFILE_INFO = gql`
  query getProfile($email: String!) {
    profile(where: { email: $email }) {
      id
      type
      email
      firstName
      lastName
      userName
      phoneNumber
      state
      city
      extProfile {
        id
        birthday
        gender
        eC1Name
        eC1Relation
        eC1Phone
        disability {
          id
          physicalDisability
        }
        orgName
        website
      }
      demographicProfile {
        id
        veteranStatus
        militaryBranch
        yearsServed
        ethnicity
      }
    }
  }
`;

// Updates Organization Profile
export const UPDATE_ORG_PROFILE = gql`
  mutation UpdateOrgProfile(
    $email: String!
    $phoneNumber: String
    $city: String
    $state: String
    $bio: String
    $userName: String
    $orgName: String
    $website: String
  ) {
    updateProfile(
      where: { email: $email }
      data: {
        phoneNumber: $phoneNumber
        city: $city
        state: $state
        bio: $bio
        userName: $userName
        extProfile: { create: { orgName: $orgName, website: $website } }
      }
    ) {
      id
    }
  }
`;
// retrieves organization profile to set default values in org form of Profile Wizard
export const ORG_PROFILE = gql`
  query($email: String!) {
    profile(where: { email: $email }) {
      id
      phoneNumber
      userName
      state
      city
      bio
      extProfile {
        orgName
        website
      }
    }
  }
`;

// Update User Extended Profile used in Step 2 of Profile Wizard
export const UPDATE_EXT_PROFILE = gql`
  mutation UpdateExtProfile(
    $email: String!
    $gender: String
    $birthday: String
    $eC1Name: String
    $eC1Relation: String
    $eC1Phone: String
    $physicalDisability: String
    $detailedDisabilities: String
    $mobilityStatus: String
  ) {
    updateProfile(
      where: { email: $email }
      data: {
        extProfile: {
          create: {
            gender: $gender
            birthday: $birthday
            eC1Name: $eC1Name
            eC1Relation: $eC1Relation
            eC1Phone: $eC1Phone
            disability: {
              create: {
                physicalDisability: $physicalDisability
                detailedDisabilities: $detailedDisabilities
              }
            }
            mobilityStatus: $mobilityStatus
          }
        }
      }
    ) {
      id
    }
  }
`;

// retrieves user profile to set default values in Step 2 of Profile Wizard
export const PROFILE_STEP_2 = gql`
  query($email: String!) {
    profile(where: { email: $email }) {
      id
      extProfile {
        gender
        birthday
        eC1Name
        eC1Relation
        eC1Phone
        disability {
          physicalDisability
          detailedDisabilities
        }
        mobilityStatus
      }
    }
  }
`;

// Update Demographic Profile used in step 3 of Profile Wizard
export const UPDATE_DEMO_PROFILE = gql`
  mutation UpdateDemoProfile(
    $email: String!
    $adaptivSportsParticipation: String
    $acsParticipation: String
    $notParticipating: String
    $angelCityParticipation: String
  ) {
    updateProfile(
      where: { email: $email }
      data: {
        demographicProfile: {
          create: {
            adaptivSportsParticipation: $adaptivSportsParticipation
            acsParticipation: $acsParticipation
            notParticipating: $notParticipating
            angelCityParticipation: $angelCityParticipation
          }
        }
      }
    ) {
      id
    }
  }
`;

export const PROFILE_STEP_3 = gql`
  query($email: String!) {
    profile(where: { email: $email }) {
      id
      demographicProfile {
        adaptivSportsParticipation
        acsParticipation
        notParticipating
        angelCityParticipation
      }
    }
  }
`;

// Update Sports Demo Profile used in step 4 of Profile Wizard
export const UPDATE_SPORTS_DEMO = gql`
  mutation UpdateSportsDemo(
    $email: String!
    $airRifle: Boolean
    $alpineSkiing: Boolean
    $archery: Boolean
    $badminton: Boolean
    $baseball: Boolean
    $beepBaseball: Boolean
    $biathlon: Boolean
    $blindHockey: Boolean
    $boccia: Boolean
    $bowling: Boolean
    $boxing: Boolean
    $canoe: Boolean
    $cheerleading: Boolean
    $crossFit: Boolean
    $crossCountrySkiing: Boolean
    $curling: Boolean
    $cycling: Boolean
    $equestrian: Boolean
    $esports: Boolean
    $fishing: Boolean
    $goalball: Boolean
    $golf: Boolean
    $hiking: Boolean
    $hunting: Boolean
    $judo: Boolean
    $juJitsu: Boolean
    $lacrosse: Boolean
    $mixedMartialArts: Boolean
    $motorsportsMotorcross: Boolean
    $mountainBiking: Boolean
    $powerlifting: Boolean
    $rafting: Boolean
    $rockClimbing: Boolean
    $rowing: Boolean
    $sailing: Boolean
    $scuba: Boolean
    $shooting: Boolean
    $skateboarding: Boolean
    $snowboarding: Boolean
    $sledHockey: Boolean
    $soccerBlindSoccerFiveaside: Boolean
    $soccerAmputeeCrutchSoccer: Boolean
    $soccerPowerSoccer: Boolean
    $soccerCPSevenaside: Boolean
    $standupWheelchairPaddling: Boolean
    $swimming: Boolean
    $surfing: Boolean
    $tableTennis: Boolean
    $taekwondo: Boolean
    $taiChi: Boolean
    $trackField: Boolean
    $triathlon: Boolean
    $volleyballBeachVolleyball: Boolean
    $volleyballSittingVolleyball: Boolean
    $waterSkiing: Boolean
    $wheelchairSkateboarding: Boolean
    $wheelchairBasketball: Boolean
    $wheelchairCurling: Boolean
    $wheelchairFencing: Boolean
    $wheelchairFootball: Boolean
    $wheelchairSoftball: Boolean
    $wheelchairRugby: Boolean
    $wheelchairTennis: Boolean
    $wrestling: Boolean
    $yoga: Boolean
    $other: Boolean
  ) {
    updateProfile(
      where: { email: $email }
      data: {
        demographicProfile: {
          update: {
            sportsParticipation: {
              create: {
                alpineSkiing: $alpineSkiing
                airRifle: $airRifle
                archery: $archery
                badminton: $badminton
                baseball: $baseball
                beepBaseball: $beepBaseball
                biathlon: $biathlon
                blindHockey: $blindHockey
                boccia: $boccia
                bowling: $bowling
                boxing: $boxing
                canoe: $canoe
                cheerleading: $cheerleading
                crossFit: $crossFit
                crossCountrySkiing: $crossCountrySkiing
                curling: $curling
                cycling: $cycling
                equestrian: $equestrian
                esports: $esports
                fishing: $fishing
                goalball: $goalball
                golf: $golf
                hiking: $hiking
                hunting: $hunting
                judo: $judo
                juJitsu: $juJitsu
                lacrosse: $lacrosse
                mixedMartialArts: $mixedMartialArts
                motorsportsMotorcross: $motorsportsMotorcross
                mountainBiking: $mountainBiking
                powerlifting: $powerlifting
                rafting: $rafting
                rockClimbing: $rockClimbing
                rowing: $rowing
                sailing: $sailing
                scuba: $scuba
                shooting: $shooting
                skateboarding: $skateboarding
                snowboarding: $snowboarding
                sledHockey: $sledHockey
                soccerBlindSoccerFiveaside: $soccerBlindSoccerFiveaside
                soccerAmputeeCrutchSoccer: $soccerAmputeeCrutchSoccer
                soccerPowerSoccer: $soccerPowerSoccer
                soccerCPSevenaside: $soccerCPSevenaside
                standupWheelchairPaddling: $standupWheelchairPaddling
                swimming: $swimming
                surfing: $surfing
                tableTennis: $tableTennis
                taekwondo: $taekwondo
                taiChi: $taiChi
                trackField: $trackField
                triathlon: $triathlon
                volleyballBeachVolleyball: $volleyballBeachVolleyball
                volleyballSittingVolleyball: $volleyballSittingVolleyball
                waterSkiing: $waterSkiing
                wheelchairSkateboarding: $wheelchairSkateboarding
                wheelchairBasketball: $wheelchairBasketball
                wheelchairCurling: $wheelchairCurling
                wheelchairFencing: $wheelchairFencing
                wheelchairFootball: $wheelchairFootball
                wheelchairSoftball: $wheelchairSoftball
                wheelchairRugby: $wheelchairRugby
                wheelchairTennis: $wheelchairTennis
                wrestling: $wrestling
                yoga: $yoga
                other: $other
              }
            }
          }
        }
      }
    ) {
      id
    }
  }
`;
// Retrieves user profile info to set default values in Step 4 of Profile Wizard
export const PROFILE_STEP_4 = gql`
  query($email: String!) {
    profile(where: { email: $email }) {
      id
      demographicProfile {
        sportsParticipation {
          alpineSkiing
          airRifle
          archery
          badminton
          baseball
          beepBaseball
          biathlon
          blindHockey
          boccia
          bowling
          boxing
          canoe
          cheerleading
          crossFit
          crossCountrySkiing
          curling
          cycling
          equestrian
          esports
          fishing
          goalball
          golf
          hiking
          hunting
          judo
          juJitsu
          lacrosse
          mixedMartialArts
          motorsportsMotorcross
          mountainBiking
          powerlifting
          rafting
          rockClimbing
          rowing
          sailing
          scuba
          shooting
          skateboarding
          snowboarding
          sledHockey
          soccerBlindSoccerFiveaside
          soccerAmputeeCrutchSoccer
          soccerPowerSoccer
          soccerCPSevenaside
          standupWheelchairPaddling
          swimming
          surfing
          tableTennis
          taekwondo
          taiChi
          trackField
          triathlon
          volleyballBeachVolleyball
          volleyballSittingVolleyball
          waterSkiing
          wheelchairSkateboarding
          wheelchairBasketball
          wheelchairCurling
          wheelchairFencing
          wheelchairFootball
          wheelchairSoftball
          wheelchairRugby
          wheelchairTennis
          wrestling
          yoga
          other
        }
      }
    }
  }
`;

// Updates Demo Profile part 2 used in step 5 of Profile Wizard
export const UPDATE_DEMO_2 = gql`
  mutation UpdateDemo2(
    $email: String!
    $veteranStatus: String
    $militaryBranch: String
    $yearsServed: String
    $ethnicity: String
    $householdIncome: String
    $employment: String
    $favProAthletes: String
    $favCelebs: String
  ) {
    updateProfile(
      where: { email: $email }
      data: {
        demographicProfile: {
          update: {
            veteranStatus: $veteranStatus
            militaryBranch: $militaryBranch
            yearsServed: $yearsServed
            ethnicity: $ethnicity
            householdIncome: $householdIncome
            employment: $employment
            favProAthletes: $favProAthletes
            favCelebs: $favCelebs
          }
        }
      }
    ) {
      id
    }
  }
`;
// Retrieves user profile info to set default values in Step 5 of Profile Wizard
export const PROFILE_STEP_5 = gql`
  query($email: String!) {
    profile(where: { email: $email }) {
      id
      demographicProfile {
        veteranStatus
        militaryBranch
        yearsServed
        ethnicity
        householdIncome
        employment
        favProAthletes
        favCelebs
      }
    }
  }
`;

// Updates Demo Profile part 3 used in Step 6 of Profile Wizard
export const UPDATE_DEMO_3 = gql`
  mutation UpdateDemo3(
    $email: String!
    $becomeAthleteMentor: String
    $athleteMentorHelp: String
    $athleteMentorSport: String
    $acsDiscovery: String
    $acsOrgSpecificDiscovery: String
    $amplaEmail: String
    $hangerClinic: String
    $challengeMagazine: String
  ) {
    updateProfile(
      where: { email: $email }
      data: {
        demographicProfile: {
          update: {
            becomeAthleteMentor: $becomeAthleteMentor
            athleteMentorHelp: $athleteMentorHelp
            athleteMentorSport: $athleteMentorSport
            acsDiscovery: $acsDiscovery
            acsOrgSpecificDiscovery: $acsOrgSpecificDiscovery
            amplaEmail: $amplaEmail
            hangerClinic: $hangerClinic
            challengeMagazine: $challengeMagazine
          }
        }
      }
    ) {
      id
    }
  }
`;

// Retrieves user profile info to set default values in Step 6 of Profile Wizard
export const PROFILE_STEP_6 = gql`
  query($email: String!) {
    profile(where: { email: $email }) {
      id
      demographicProfile {
        becomeAthleteMentor
        athleteMentorHelp
        athleteMentorSport
        acsDiscovery
        acsOrgSpecificDiscovery
        amplaEmail
        hangerClinic
        challengeMagazine
      }
    }
  }
`;
