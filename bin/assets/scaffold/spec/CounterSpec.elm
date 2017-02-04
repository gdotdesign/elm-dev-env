import Spec exposing (..)

import Counter exposing (..)

specs =
  describe "Counter"
    [ before
      [ assert.containsText
        { selector = ".counter strong"
        , text = "0"
        }
      ]

    , context "Clicking on increment"
      [ it "increments the counter"
        [ steps.click "button:first-of-type"
        , assert.containsText
          { selector = ".counter strong"
          , text = "-1"
          }
        ]
      ]

    , context "Clicking on decrement"
      [ it "increments the counter"
        [ steps.click "button:last-of-type"
        , assert.containsText
          { selector = ".counter strong"
          , text = "1"
          }
        ]
      ]
    ]

main =
  runWithProgram
    { subscriptions = \_ -> Sub.none
    , init = \_ -> init
    , update = update
    , view = view
    } specs
