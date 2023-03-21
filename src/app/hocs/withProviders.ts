import compose from 'compose-function'

import { withAuth } from 'app/hocs/withAuth'
import { withErrorBoundary } from 'app/hocs/withErrorBoundary'
import { withNotification } from 'app/hocs/withNotification'
import { withRouter } from 'app/hocs/withRouter'
import { withStore } from 'app/hocs/withStore'

export const withProviders = compose(
  withErrorBoundary,
  withRouter,
  withStore,
  withNotification,
  withAuth,
)
