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
| filter isSQLi == true or isXSS == true
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
| transpose domain
```