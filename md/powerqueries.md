```sql
dataSource.name='Extrahop Reveal(x) 360'
| filter clientIsExternal == true
| filter isEncrypted == false
| group event_count = count() by uri
| sort - event_count
```

```sql
dataSource.name='Extrahop Reveal(x) 360'
| filter clientIsExternal == true
| filter isEncrypted == false
| let clientCountry = geo_ip_country(clientAddr)
| group event_count = count() by serverAddr, clientAddr, clientCountry
| sort - event_count
```

```sql
dataSource.name='Extrahop Reveal(x) 360'
| filter clientIsExternal == false
| filter isEncrypted == false
| group event_count = count() by serverAddr, clientAddr
| sort - event_count
```

```sql
dataSource.name='Extrahop Reveal(x) 360'
| filter clientIsExternal == false
| filter serverIsExternal == true
| filter isEncrypted == false
| let serverCountry = geo_ip_country(serverAddr)
| group event_count = count() by serverAddr, serverCountry, clientAddr
| sort - event_count
```

```sql
dataSource.name='Extrahop Reveal(x) 360'
| filter clientIsExternal == true
| filter isEncrypted == false
| filter reqBytes > 5000 
| group event_count = count() by uri, reqBytes, rspBytes
| sort - event_count
| columns uri, reqBytes, rspBytes 
```

```sql
dataSource.name='Extrahop Reveal(x) 360'
| filter clientIsExternal == true
| filter isEncrypted == false
| group event_count = count() by serverAddr, clientAddr
| sort - event_count
```

```sql
dataSource.name='Extrahop Reveal(x) 360'
| filter clientIsExternal == false
| filter isEncrypted == false
| group event_count = count() by serverAddr, clientAddr
| sort - event_count
```

```sql
dataSource.name='Extrahop Reveal(x) 360'
| filter isEncrypted == false
| filter isSQLi == true OR isXSS == true
| columns host, contentType, uri, query, xss
```

```sql
dataSource.name='Extrahop Reveal(x) 360' qname=* dataSource.category = 'security'
| filter serverPort = 53
| let domainType = extract_matches(qname, '[\\w\\-]+')
| let length = len(domainType)
| let a = array_get(domainType, length-2), b = array_get(domainType, length-1)
| let c = trim(a, "."), d = c + "." + b
| let domain = lower(d), qname = lower(qname)
| group events = count() by domain, timestamp = timebucket("1h")
| sort - events
```

```sql
dataSource.name='Extrahop Reveal(x) 360' 
| filter certificateNotAfter=* certificateNotBefore=*
| let certificate_NotAfter = strftime(certificateNotAfter * 1000000000)
| let certificate_NotBefore = strftime(certificateNotBefore * 1000000000)
| let days_toExpire = ((certificateNotAfter * 1000000000) - now()) / 1000000000 / 86400
| group count() by serverAddr, certificate_NotAfter, days_toExpire
| filter days_toExpire >= 0
| sort days_toExpire
```

```sql
dataSource.name = 'Extrahop Reveal(x) 360' serverPort = 53 txId != 1
| let txId = string(txId) 
| group count = count(), 
  answers = array_agg(answers) by clientAddr, serverAddr, qname, txId 
| columns clientAddr, serverAddr, qname, answers, count, txId
| let sequence = ( count == 1 ) ? " > " : " < > "
```