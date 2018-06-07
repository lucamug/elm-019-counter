-- Read more about this program in the official Elm guide:
-- https://guide.elm-lang.org/architecture/user_input/buttons.html


module Main exposing (..)

import Html exposing (beginnerProgram, button, div, h1, text)
import Html.Events exposing (onClick)


main : Program Never Int Msg
main =
    beginnerProgram { model = model, view = view, update = update }



-- MODEL


model : Int
model =
    0



-- UPDATE


type Msg
    = Increment
    | Decrement


update : Msg -> Int -> Int
update msg model =
    case msg of
        Increment ->
            model + 1

        Decrement ->
            model - 1



-- VIEW


view : Int -> Html.Html Msg
view model =
    div []
        [ h1 [] [ text "0.18" ]
        , button [ onClick Decrement ] [ text "-" ]
        , div [] [ text (toString model) ]
        , button [ onClick Increment ] [ text "+" ]
        ]
