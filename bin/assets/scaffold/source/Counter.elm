module Counter exposing (..)

{-| A counter component.

# Model
@docs Model, Msg, init, update

# View
@docs view
-}
import Html.Attributes exposing (class)
import Html.Events exposing (onClick)
import Html exposing (..)


{-| Representation of a counter.
-}
type alias Model =
  { counter : Int
  }


{-| Messages that a counter can receive.
-}
type Msg
  = Increment
  | Decrement


{-| Initializes a counter.
-}
init : Model
init =
  { counter = 0
  }


{-| Updates a counter.
-}
update : Msg -> Model -> ( Model, Cmd Msg )
update msg model =
  case msg of
    Increment ->
      ( { model | counter = model.counter + 1 }, Cmd.none )

    Decrement ->
      ( { model | counter = model.counter - 1 }, Cmd.none )


{-| Renders a counter.
-}
view : Model -> Html.Html Msg
view model =
  article []
    [ h1 [] [ text "Counter" ]
    , p []
      [ span [] [ text "This is an minimal project to get you started with" ]
      , strong [] [ text "elm-dev-env" ]
      , span [] [ text "!" ]
      ]
    , div [ class "counter" ]
      [ span [] [ text "Counter:" ]
      , strong [] [ text (toString model.counter) ]
      ]
    , div [ class "buttons" ]
      [ button [ onClick Decrement ] [ text "- Decrement" ]
      , button [ onClick Increment ] [ text "+ Increment" ]
      ]
    ]
