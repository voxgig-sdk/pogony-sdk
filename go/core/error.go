package core

type PogonyError struct {
	IsPogonyError bool
	Sdk              string
	Code             string
	Msg              string
	Ctx              *Context
	Result           any
	Spec             any
}

func NewPogonyError(code string, msg string, ctx *Context) *PogonyError {
	return &PogonyError{
		IsPogonyError: true,
		Sdk:              "Pogony",
		Code:             code,
		Msg:              msg,
		Ctx:              ctx,
	}
}

func (e *PogonyError) Error() string {
	return e.Msg
}
