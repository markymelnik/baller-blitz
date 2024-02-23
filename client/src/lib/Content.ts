export const Content = {
  common: {
    okay: 'Okay',
    close: 'Close',
    confirm: 'Confirm',
    remove: 'Remove',
    areYouSure: 'Are you sure?',
    edit: 'Edit',
    accept: 'Accept',
    reject: 'Reject',
    unfriend: 'Unfriend',
  },
  main: {
    title: {
      ball: 'Ball',
      battle: 'Battle.',
    },
  },
  auth: {
    signup: {
      title: 'Sign up',
      prompt: 'Create your account',
      validationPrompt: {
        1: 'Must be between 10 and 20 characters',
        2: 'Must container upper and lower case letters',
        3: 'Must contain at least 1 number',
      },
      alreadyUser: 'Already have an account?',
    },
    login: {
      title: 'Login',
      prompt: {
        noEmail: 'Welcome back',
        yesEmail: 'Enter your password'
      },
      needAccount: `Don't have an account?`,
    },
    logout: {
      title: 'Logout',
    },
    email: {
      title: 'Email address',
    },
    password: {
      title: 'Password',
    },
    username: {
      title: 'Username',
    },
  },
  home: {
    title: 'Home',
    prompt: 'Get started',
  },
  games: {
    title: 'Games',
    status: {
      1: `Game information`,
      2: `Games are live!`,
      3: `All games have finished`,
      4: `New game information at 12 PM ET!`,
    },
    no: {
      1: 'No games scheduled for today.',
      2: 'Come back tomorrow!',
    },
  },
  profile: {
    currentPredictions: {
      title: 'Current Predictions',
      none: 'No predictions made today',
    },
    historyPredictions: {
      title: 'Past History',
      none: 'No History',
    },
    userStats: {
      title: 'User Stats',
      winPrediction: 'Win Prediction',
    },
  },
  userProfile: {
    error: 'Error loading user profile',
    stats: {
      predicted: 'correct out of',
      total: 'predictions made',
    }
  },
  verifySuccess: {
    message: 'Your email is verified!',
  },
  fallback: {
    unauthenticated: 'Unauthenticated Access',
    unauthorized: 'Unauthorized Access',
    notFound: 'The page you are looking for does not exist.',
  },
  settings: {
    title: 'Settings',
    username: {
      prompt: 'Edit username',
      success: 'Success! Username updated!'
    }
  },
  friends: {
    title: 'Friends',
    fallback: 'Search for friends!',
  },
  search: {
    title: 'Search',
    error: 'Error fetching users',
    noResults: 'No Results',
  },
  notifs: {
    title: 'Notifications',
    friendRequests: {
      title: 'Friend Requests',
      fallback: 'Search for friends!',
    }
  },
  overlay: {
    selectWinner: {
      prompt: 'Who will win?',
      state: {
        1: 'Select Winner',
        2: 'Confirm',
        3: 'Submit',
      },
      submit: {
        success: 'Success! Your prediction was saved.',
        failure: 'You already predicted this match!',
      },
      submitWarning: 'Are you sure?',
    },
    alreadyPredicted: {
      prompt: '',
      state: {
        1: 'Confirm',
        2: 'Submit',
      },
    },
    startedOverlay: {
      message: 'The game has started!',
    },
    verifyOverlay: {
      heading: {
        1: `You're one step away.`,
        2: `Verify your email address.`,
        3: `Check your email and click the link to complete your profile.`,
      },
      resend: {
        question: `Don't see it?`,
        prompt: `Resend verification link`,
        sent: `Sent!`,
        tooMany: `Too many attempts. Wait to try again.`,
      },
    },
  },
};