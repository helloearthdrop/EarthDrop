import urllib.request; html = urllib.request.urlopen('https://www.earthdrop.in/transfer').read().decode('utf-8'); print([x for x in html.split('"') if 'http' in x and 'api' in x])
