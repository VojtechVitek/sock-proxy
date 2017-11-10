# Slack Desktop app behind a SOCK proxy on macOS

Originally posted at http://www.vojtechvitek.com/posts/slack-desktop-app-behind-a-sock-proxy-on-macos-14045333

Are you behind a company network (or VPN) that restricts access to Slack? Or does the company force you to install a custom root certificate in order for you to log into a certain Slack team using SSO? Here's a solution for you..
First of all, you need a server that is outside of the restricted company network. Create a SOCK proxy to that server using SSH and keep the connection open:

    ssh -D 8000 [username]@[server]
    
1. Go to System Preferences
2. Select your network interface (most probably WIFI or Wired connection)
3. Click on Advanced..
4. Click on Proxies tab
5. Select and check off Automatic Proxy Configuration
6. Paste in this URL: https://raw.githubusercontent.com/VojtechVitek/sock-proxy/master/slack-proxy.pac (you can see the content of the file below)
7. Hit OK and Apply the changes

Applying proxy.pac configuration file hosted on Github on macOS
**Note: The proxy.pac file must be served from http[s]. Local files don't work on recent macOS systems, since file:// URLs are sandboxed. Use Github :)**

```
function FindProxyForURL(url, host) {
    
    if (shExpMatch(host, "*.slack-msgs.com")) {        
        // Use SOCK proxy,
        // or fall back to a DIRECT traffic.
        // ssh -D 8000 [user]@[server]
        return "SOCKS 127.0.0.1:8000; DIRECT";
    }
    
    return "DIRECT";
}
```

Here you go. Slack is working again. Enjoy!
