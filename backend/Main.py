import cherrypy
from Wrapper import Wrapper

@cherrypy.expose
class MyController(object):
    def __init__(self):
        self._w = Wrapper()

    @cherrypy.tools.json_out()
    def GET(self, tabella, id=-1):
        cherrypy.response.headers['Access-Control-Allow-Origin'] = '*'
        if not tabella:
            cherrypy.response.status = 404
            return {"errore": "Necessario nome tabella"}
        if (int(id) == -1):
            if tabella.lower() == "categoria": return self._w.visuaCategoria()
            elif tabella.lower() == "zona": return self._w.visuaZone()
            elif tabella.lower() == "prestazione": return self._w.visua_prestazione()
            elif tabella.lower() == "socio": return self._w.visuaSocio()
            elif tabella.lower() == "offerta": return self._w.visuaOfferta()
            elif tabella.lower() == "effettua": return self._w.visuaEffettua()
            elif tabella.lower() == "prenotazione": return self._w.visuaPrenotazioni()
            else:
                cherrypy.response.status = 404
                return {"errore": "Tabella non trovata"}

    @cherrypy.tools.json_in()
    @cherrypy.tools.json_out()
    def POST(self):
        cherrypy.response.headers['Access-Control-Allow-Origin'] = '*'
        data = cherrypy.request.json
        azione = data["azione"]
        data.pop("azione")
        if azione == "login":
            #res = self._w.login(data["usr"], data["psw"])
            res = self._w.login2(data["usr"], data["psw"])
            return {"esito": 1} if res == 1 else {"esito": 0}
        elif azione == "register":
            #res = self._w.register((data["cognome"], data["nome"], data["via"], data["cap"], data["citta"], data["telefono"], data["ZCod"], data["usr"], data["psw"]))
            res = self._w.register((data["usr"], data["psw"]))
            return {"esito": 1} if res == 1 else {"esito": 0}
        else:
            cherrypy.response.status = 400
            return {"errore": "azione non prevista"}

conf = {
    '/': {
        'request.dispatch': cherrypy.dispatch.MethodDispatcher(),
        'tools.sessions.on': True,
        'tools.response_headers.on': True,
        #'tools.response_headers.headers': [('Content-Type', 'application/json')]
        #devo aggiungere l'header "Access-Control-Allow-Origin" per abilitare le richieste da un dominio differente
        'tools.response_headers.headers': [
            #('Content-Type', 'application/json'), 
            ('Access-Control-Allow-Origin', '*'), 
            #("Access-Control-Allow-Headers", "*")
            #("Access-Control-Allow-Headers", "X-Requested-With")
            ("Access-Control-Allow-Headers", "ngrok-skip-browser-warning")
        ],
        #tolgo l'autenticazione per il momento
        #'tools.auth_basic.on': True,
        #'tools.auth_basic.realm': MyController.RLM,
        #'tools.auth_basic.checkpassword': MyController.validate_password
    }
}  

cherrypy.quickstart(MyController(), '/', conf)
#cherrypy.quickstart(MyController())