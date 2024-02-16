export const Content = {
  common: {
    okay: 'Okay',
    close: 'Close',
  },
  auth: {
    signup: {
      title: 'Sign Up',
      prompt: 'Enter an email and address',
      validationPrompt: {
        1: 'Must be between 10 and 20 characters',
        2: 'Must container upper and lower case letters',
        3: 'Must contain at least 1 number',
      },
      alreadyUser: 'Already a user?',
    },
    login: {
      title: 'Login',
      prompt: 'Enter your email and address',
      needAccount: 'Need an account?',
    },
    logout: {
      title: 'Logout',
    },
    email: {
      title: 'Email'
    },
    password: {
      title: 'Password'
    }
  },
  home: {
    intro: 'Hello.',
  },
  front: {
    games: {
			title: 'Games',
      status: {
        1: `Games haven't started yet`,
        2: `Games are live!`,
        3: `All games have finished
				<br />
				New game information at 12 PM ET!`,
      },
    },
  },
	profile: {
		currentPredictions: {
			title: 'Current Predictions',
			none: 'No predictions made today'
		},
		historyPredictions: {
			title: 'Past History',
			none: 'No History'
		},
    userStats: {
      title: 'User Stats',
      winPrediction: 'Win Prediction'
    }
	},
  verifySuccess: {
    message: 'Your email is verified!'
  },
  fallback: {
    unauthenticated: 'Unauthenticated Access',
    unauthorized: 'Unauthorized Access',
    notFound: 'The page you are looking for does not exist.',
  },
  overlay: {
    selectWinner: {
      prompt: 'Who will win?',
      state: {
        1: 'Select Winner',
        2: 'Confirm',
        3: 'Submit',
      },
      submitWarning: 'Are you sure?'
    },
    alreadyPredicted: {
      prompt: '',
      state: {
        1: 'Confirm',
        2: 'Submit',
      }
    }
  }
};