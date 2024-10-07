```sql
event.category = 'windows_event_logs' 
| filter ( winEventLog.id = 4738 OR winEventLog.id = 5136 OR winEventLog.id = 4769 ) 
| group events = count() by winEventLog.data.event.eventData.targetDomainName, winEventLog.data.event.eventData.targetUserName, 
  timestamp = timebucket("10m"), 
  winEventLog.id = string(winEventLog.id)
| lookup Description from wel-ad-compromises.csv by winEventLog.id
```
