module Main exposing (..)

import Counter exposing (..)
import Html

main : Program Never Model Msg
main =
  Html.program
    { subscriptions = \_ -> Sub.none
    , init = ( init, Cmd.none )
    , update = update
    , view = view
    }
