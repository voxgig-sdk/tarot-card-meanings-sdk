package core

type TarotCardMeaningsError struct {
	IsTarotCardMeaningsError bool
	Sdk              string
	Code             string
	Msg              string
	Ctx              *Context
	Result           any
	Spec             any
}

func NewTarotCardMeaningsError(code string, msg string, ctx *Context) *TarotCardMeaningsError {
	return &TarotCardMeaningsError{
		IsTarotCardMeaningsError: true,
		Sdk:              "TarotCardMeanings",
		Code:             code,
		Msg:              msg,
		Ctx:              ctx,
	}
}

func (e *TarotCardMeaningsError) Error() string {
	return e.Msg
}
