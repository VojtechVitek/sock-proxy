function FindProxyForURL(url, host) {
    if (shExpMatch(host, "*.slack-msgs.com")) {        
        // Use proxy, fall back to direct if not available.
        // ssh -D 8000 [user]@[server]
        return "SOCKS 127.0.0.1:8000; DIRECT";
    }

    return "DIRECT";
}
