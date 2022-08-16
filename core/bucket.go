package core

import (
	"github.com/beego/beego/v2/adapter/logs"
	_ "github.com/cdle/sillyGirl/develop/boltdb"
)

var sillyGirl Bucket = MakeBucket("sillyGirl")
var Zero Bucket

func MakeBucket(name string) Bucket {
	if Zero == nil {
		logs.Error("找不到存储器，开发者自行实现接口。")
	}
	return Zero.Copy(name)
}

type Bucket interface {
	Copy(string) Bucket
	Set(interface{}, interface{}) error
	Empty() (bool, error)
	Size() (int64, error)
	Delete() error
	Type() string
	Buckets() ([][]byte, error)
	GetString(...interface{}) string
	GetBytes(string) []byte
	GetInt(string, ...int) int
	GetBool(string, ...bool) bool
	Foreach(func([]byte, []byte) error)
	Create(interface{}) error
	First(interface{}) error
	String() string
}
