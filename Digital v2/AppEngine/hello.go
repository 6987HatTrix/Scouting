package hello

import (
	"appengine"
	"appengine/urlfetch"
	"bytes"
	"fmt"
	"html/template"
	"net/http"
	"net/url"
)

func init() {
	http.HandleFunc("/submit", sign)
}

func sign(w http.ResponseWriter, r *http.Request) {
	//err := signTemplate.Execute(w, r.FormValue("data"))
	// if err != nil {
	// 	http.Error(w, err.Error(), http.StatusInternalServerError)
	// }
	c := appengine.NewContext(r)
	sendDataToSheet(r.FormValue("data"), c, w)
}

func sendDataToSheet(str string, c appengine.Context, w http.ResponseWriter) {
	str = url.QueryEscape(str)
	client := urlfetch.Client(c)
	resp, err := client.Get("https://script.google.com/macros/s/AKfycbwzAS6AuvQvQYoqIDMogjZgGVltcs9pC0IDOH4RiecYuMjAELmt/exec" + "?data=" + str)
	if err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}

	buf := new(bytes.Buffer)
	buf.ReadFrom(resp.Body)

	fmt.Fprintf(w, buf.String())
}

var signTemplate = template.Must(template.New("sign").Parse(signTemplateHTML))

const signTemplateHTML = `
<html>
<body>
<p>You wrote:</p>
<pre>{{.}}</pre>
</body>
</html>
`
