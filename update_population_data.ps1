 = Get-Content " src\\data\\Population.csv\ -Raw; = Get-Content \src\\data\\populationData.ts\ -TotalCount 23 | Out-String; = Get-Content \src\\data\\populationData.ts\ | Select-Object -Skip 478 | Out-String; = + + \
\; += ; Set-Content -Path \src\\data\\populationData.ts\ -Value -Encoding UTF8
