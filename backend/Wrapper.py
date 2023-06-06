import pymssql
import datetime

class  Wrapper:
    def __init__(self):
        #5.172.64.20
        #192.168.40.16
        self.server = "192.168.40.16\SQLEXPRESS"
        self.user = "CRD2122"
        self.password = "xxx123##"
        self.db = "CRD2122"
    
    def connetti(self):
        try:
            return pymssql.connect(self.server, self.user, self.password, self.db)
        except :
            print("errore connessione")
        
    def disconnetti(self, conn):
        #disconnessione 
        try:
            conn.close()
        except:
            print("errore disconnessione")
            return 0
        
    def login(self, usr, psw):
        conn = self.connetti()
        try:
            cur = conn.cursor()
            query = "SELECT SCod FROM I53_Bdt_Socio WHERE Username = %s AND Password = %s"
            cur.execute(query, (usr, psw))
            res = cur.fetchall()
            return len(res) == 1
        except Exception as e:
            print(e)
            return 0
        
    def login2(self, usr, psw):
        conn = self.connetti()
        try:
            cur = conn.cursor()
            query = "SELECT * FROM Utenti WHERE Username = %s AND Password = %s"
            cur.execute(query, (usr, psw))
            res = cur.fetchall()
            return len(res) == 1
        except Exception as e:
            print(e)
            return 0

    def register(self, dati):
        conn = self.connetti()
        try:
            cur = conn.cursor()
            query = "INSERT INTO I53_Bdt_Socio VALUES (%s, %s, %s, %s, %s, %s, %d, %s, %s)"
            cur.execute(query, dati)
            conn.commit()
            return 1
        except Exception as e:
            print(e)
            return 0
    
    def register2(self, dati):
        conn = self.connetti()
        try:
            cur = conn.cursor()
            query = "INSERT INTO Utenti VALUES (%s, %s)"
            cur.execute(query, dati)
            conn.commit()
            return 1
        except Exception as e:
            print(e)
            return 0

    def visuaZone(self):
        lista = []
        con = self.connetti()
        try:
            cur = con.cursor(as_dict=True)
            query = "select * from I53_Bdt_Zona"
            cur.execute(query)
            lista = cur.fetchall()
            self.disconnetti(con)
            return lista
        except Exception as e:
            print(e)
            print("errore")
            self.disconnetti(con)

    def visuaPrenotazioni(self):
        #Visualizzazione Prenotazioni
        bol = True
        conn = self.connetti()
        tup =  ()
        try:
            cursore = conn.cursor(as_dict=True)
            sql = "SELECT * FROM I53_Bdt_Prenotazione"
            cursore.execute(sql)
            tup = cursore.fetchall() 
            for x in tup:
                x["DataDellaRich"] = str(x["DataDellaRich"])
                x["DataP"] = str(x["DataP"])
        except Exception as err:
            print(" ")
            print(str(err))
            print(" ")                  
            bol = False
        self.disconnetti(conn)
        return tup
    
    def insertZona(self, ZDescr, ZMappa):
        con = self.connect()
        try:
            cur = con.cursor(as_dict=True)
            query = "INSERT INTO I53_Bdt_Zona VALUES (%s, %s)"        
            cur.execute(query,( ZDescr, ZMappa))
            con.commit()
        except: 
            print("errore inserimento")
        self.disconnect()

    def insertPrenotazioni(self, parametri): 
        #Inserimento Prenotazioni
        bol = True
        conn = self.connetti()
        try:
            cursore = conn.cursor()
            sql = "INSERT INTO I53_Bdt_Prenotazione VALUES(%d, %s, %d, %s, %s)"
            cursore.execute(sql, parametri)
            conn.commit()
        except Exception as err:
            print(" ")
            print(str(err))
            print(" ")
            bol = False
        self.disconnetti(conn)
        return bol
    
    
    def visuaOfferta(self):
        con = self.connetti()
        try:
            cur = con.cursor(as_dict=True)
            query = "SELECT * FROM I53_Bdt_Offerta"
            cur.execute(query)
            res1 = cur.fetchall()
            return res1
        except Exception as e:
            print(e)
        self.disconnetti(con)

    def insertOfferta(self, dati):
        con = self.connetti()
        try:
            cur = con.cursor(as_dict=True)
            query = "INSERT INTO I53_Bdt_Offerta VALUES (%s, %s)"
            cur.execute(query, dati)
            con.commit()
            print("operazione riuscita")
        except Exception as e:
            print(e)
            self.disconnetti(con)    
    
    
    def insertCategoria(self, dati):
            con = self.connetti()
            try:
                cur = con.cursor(as_dict=True)
                query = "INSERT INTO I53_BdT_Categoria VALUES (%s)"
                cur.execute(query, dati)
                con.commit()
                print("operazione riuscita")
            except Exception as e:
                print(e)
                self.disconnetti(con)


    def visuaCategoria(self):
        con = self.connetti()
        try:
            cur = con.cursor(as_dict=True)
            query = "SELECT * FROM I53_BdT_Categoria"
            cur.execute(query)
            res1 = cur.fetchall()
            return res1
        except Exception as e:
            print(e)
        self.disconnetti(con)
        
        
    def visuaSocio(self):
        con = self.connetti()
        try:
            cur = con.cursor(as_dict=True)
            query = "SELECT * FROM dbo.I53_BdT_Socio"
            cur.execute(query)
            res1 = cur.fetchall()
            return res1
        except Exception as e:
            print(e)
        self.disconnetti(con)


    def insertSocio(self, dati):
        con = self.connetti()
        try:
            cur = con.cursor(as_dict=True)
            query = "INSERT INTO I53_BdT_Socio VALUES (%s, %s, %s, %s, %s, %s, %d)"
            cur.execute(query, dati)
            con.commit()
            print("operazione riuscita")
        except Exception as e:
            print(e)
            self.disconnetti(con)
        
        
    def visua_prestazione(self, as_dict = False):
        x = 0
        try:
            con = self.connetti()
            cur = con.cursor(as_dict = True)
            sql = "SELECT * FROM I53_BdT_Prestazione"
            cur.execute(sql)
            x = cur.fetchall()
        except Exception as err:
            print("********** ERRORE [visua_prestazione] **********")
            print(str(err))    
            print("******************************************")    
        self.disconnetti(con)
        return x
           
    def insert_prestazione(self, parametri):
        try:
            print(parametri)
            con = self.connetti()
            cur = con.cursor(as_dict=True)
            sql = "INSERT INTO I53_BdT_Prestazione VALUES (%s, %d)"
            cur.execute(sql, parametri)
            con.commit()
            return 1
        except Exception as err:
            print("********** ERRORE [insert_prestazione] **********")
            print(str(err))
        self.disconnetti(con)
        return 0

    def visuaEffettua(self):
        con = self.connetti()
        try:
            cur = con.cursor(as_dict=True)
            query = "SELECT * FROM I53_Bdt_Effettua"
            cur.execute(query)
            res1 = cur.fetchall()
            for x in res1:
                x["Data"] = str(x["Data"])
            return res1
        except Exception as e:
            print(e)
        self.disconnetti(con)

    def insertEffettua(self, dati):
        con = self.connetti()
        try:
            cur = con.cursor(as_dict=True)
            query = "SELECT * FROM I53_Bdt_Effettua"
            cur.execute(query)
            res1 = cur.fetchall()
            return res1
        except Exception as e:
            print(e)
        self.disconnetti(con)
   
    def query1(self, as_dict = False):
        x = 0
        try:
            con = self.connetti()
            cur = con.cursor(as_dict = True)
            sql = """
                    create table BdT_t1 (
                    se int not null,
                    oe int not null )
                    INSERT INTO BdT_t1
                    select SocioErogante, sum(Ore)
                    from I53_BdT_Effettua
                    group by SocioErogante
                   
                    create table BdT_t2 (
                    sri int not null,
                    ori int not null )
                    INSERT INTO BdT_t2
                    select SocioRicevente, sum(Ore)
                    from I53_BdT_Effettua
                    group by SocioRicevente
                   
                    select t2.Sri, s.Cogn, s.Nome,
                    s.via, (t2.ori - t1.oe) OreDebito
                    from Bdt_T1 t1 join BdT_T2 t2
                    on t1.se=t2.sri
                    join I53_BdT_Socio s on s.SCod=t2.sri
                    where t2.ori > t1.oe
                    union
                    select t2.sri, s.Cogn, s.Nome,
                    s.via, t2.ori OreDebito
                    from BdT_T2 t2
                    join I53_BdT_Socio s on s.SCod=t2.sri
                    where t2.sri not in(select se
                    from BdT_T1)
                    """
            cur.execute(sql)
            x = cur.fetchall()
        except Exception as err:
            print("********** ERRORE [query1] **********")
            print(str(err))    
            print("******************************************")    
        self.disconnetti(con)
        return x

    def query4(self):
        con = self.connetti()
        lista = []
        cur = con.cursor(as_dict=True)
        query = "select PDescr, sum(Ore) OreErogate from I53_BdT_Prestazione p join I53_BdT_Effettua eff on p.PCod=eff.PCod group by PDescr order by OreErogate desc"
        try:
            cur.execute(query)
            lista = cur.fetchall()
            self.disconnetti(con)
        except: 
            print("errore nella visua")
            self.disconnetti(con)
        con.close()
        return lista

    def query3(self):
        result = []
        try:
            con = self.connetti()
            cursor = con.cursor(as_dict=True)
            query = """
            SELECT s.Cogn, s.Nome, s.Via, s.Citta, s.Tel
            FROM I53_BdT_Socio as s 
            JOIN I53_BdT_Offerta as o 
            ON s.SCod=o.SCod
            JOIN I53_BdT_Prestazione as p 
 	        ON p.PCod=o.PCod
            WHERE p.PDescr = 'segreteria'
            AND o.SCod IN (
            SELECT oo.scod
                   FROM I53_BdT_Offerta as oo
                   JOIN I53_BdT_Prestazione as pr 
            ON oo.PCod=pr.PCod
            WHERE pr.PDescr <> 'segreteria')
            """
            cursor.execute(query)
            result = cursor.fetchall()
            print(cursor.rowcount)
        except:
            print("ciao")
            self.disconnetti(con)
        return result
    
    def query2(self, dati):
            con = self.connetti()
            try:
                cur = con.cursor(as_dict=True)
                query = " select ZMappa from BdT_Zona z join BdT_Socio s on z.ZCod = s.zCod where s.SCod = %s"
                cur.execute(query, (dati))
                res = cur.fetchone()
                self.disconnect(con)
                return res
            except:
                err = "Errore"
                self.disconnetti(con)
                return err