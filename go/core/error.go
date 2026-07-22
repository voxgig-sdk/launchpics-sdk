package core

type LaunchpicsError struct {
	IsLaunchpicsError bool
	Sdk              string
	Code             string
	Msg              string
	Ctx              *Context
	Result           any
	Spec             any
}

func NewLaunchpicsError(code string, msg string, ctx *Context) *LaunchpicsError {
	return &LaunchpicsError{
		IsLaunchpicsError: true,
		Sdk:              "Launchpics",
		Code:             code,
		Msg:              msg,
		Ctx:              ctx,
	}
}

func (e *LaunchpicsError) Error() string {
	return e.Msg
}
