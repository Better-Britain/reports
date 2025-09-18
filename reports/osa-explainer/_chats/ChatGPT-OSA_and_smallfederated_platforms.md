# OSA and small/federated platforms

#### You:
what's the defed platfrom bluesky is built on?

#### ChatGPT:
Bluesky is built on the **AT Protocol** (Authenticated Transfer Protocol). citeturn0search3turn0search0turn0search23

Some details:

- Open-source framework for social apps. citeturn0search3
- Federation / interoperability between instances (Personal Data Servers) so users can retain identity, follows, etc. across servers. citeturn0search23turn0search5turn0search15
- Licensed under MIT / Apache for many parts. citeturn0search23turn0search16

If you meant something else by "defed platform", tell me — I can clarify.


#### You:
what's it called under say signal (can you self-host) or under telegram? (again, if you self0host)

#### ChatGPT:
\[Unsupported Content]


#### You:
what's it called under say signal (can you self-host) or under telegram? (again, if you self0host)

#### ChatGPT:
- Signal doesn’t support federation; you **can’t** self-host a fully compatible Signal server to interoperate with official Signal network. citeturn0search7turn0search2turn0search0
- Telegram uses **MTProto** as its protocol. citeturn0search23
- Also, Telegram currently doesn’t allow running your own alternative servers that integrate with its global Telegram network. citeturn0search7


#### You:
okay so MTProto and AT Protocol aren't names I[m familiar with. Why those? I thought they were called something else

#### ChatGPT:
Right — the names you’ve seen floating around are the **protocols** rather than the apps themselves.

- **Signal** → its wire format + transport is called the **Signal Protocol** (that’s the cryptographic protocol; it isn’t federated, and the main server infra is closed, so no self-hosted federation).
- **Telegram** → its transport & crypto protocol is **MTProto**. The app is centralized; you can run test servers but you don’t get federation with the main network.
- **Bluesky** → its underlying system is the **AT Protocol**, which is explicitly a federated social networking protocol.

So the “other names” are just the technical underpinnings. Signal is commonly just called “Signal” since the app and protocol share the name. Telegram kept “MTProto” distinct. Bluesky wanted the AT Protocol as a separately branded layer.

Do you want me to break down **what each protocol actually handles** (crypto, identity, federation, etc.) so you can see why the naming differs?


#### You:
so what have I heard real people call them?

#### ChatGPT:
In everyday conversation people usually don’t bother with the protocol names at all:

- **Signal** → people just say *“Signal”*. If they mean the crypto, they might say *“the Signal protocol”*, but most don’t.
- **Telegram** → people just say *“Telegram”*. Almost nobody outside dev/security circles mentions *“MTProto”*.
- **Bluesky** → people say *“Bluesky”*. Only folks following dev/fediverse stuff talk about *“AT Protocol”*.

So:

- For Signal, “Signal” = app + protocol in casual talk.
- For Telegram, “Telegram” = app, “MTProto” is rarely mentioned.
- For Bluesky, “Bluesky” = app, “AT Protocol” comes up if people are comparing it to ActivityPub (Mastodon).

Would you like me to also line up what the **federated equivalent** would be in the Fediverse world (e.g. ActivityPub vs Matrix vs AT Protocol)?


#### You:
no, when I heard people talk about the protocols, they didn't use those names

#### ChatGPT:
Got it — if folks weren’t saying *AT Protocol* / *MTProto* / *Signal Protocol*, then what you likely heard were the **ecosystem shorthand names** people actually use:

- For **Signal**, devs and security people often just call it *“the Signal protocol”* or even just *“Signal’s crypto”*. It’s also the basis of **“double ratchet”** (that term comes up a lot).
- For **Telegram**, you’ll hear people say *“Telegram’s encryption”*, *“Telegram’s custom protocol”*, or sometimes *“MTProto”* but usually with eye-rolls because of skepticism.
- For **Bluesky**, people almost always compare it to *“ActivityPub”* (the Mastodon/Fediverse standard). In casual chat, you’ll hear *“Bluesky’s protocol”* or *“their AT thing”*, not the formal name.

So the “real world” naming is usually:

- *Signal protocol* → “Signal” / “double ratchet”
- *MTProto* → “Telegram’s encryption”
- *AT Protocol* → “Bluesky’s protocol” / “their federation thing”

Do you want me to pull some direct quotes from community discussions (Reddit, HN, etc.) so you can see the exact phrases people throw around?


#### You:
hmm. I've heard something else but my brain isn't helping... Okay let's use a different angle... I'm talking about how companies can avoid significant responsibilities under the OSA (online safety act) by staying small, so small operators can run their own server but joining a larger network

#### ChatGPT:
Ahh, now I see the angle you’re coming at — you’re talking about the **regulatory framing** (like UK’s Online Safety Act) where the legal category depends on whether the service is “one big platform” or “a federated service built on a protocol.”

In that space, the names people actually throw around aren’t usually *MTProto* or *AT Protocol*. They’re more like:

- **“A protocol, not a platform.”** That’s the line Bluesky uses a lot: the **AT Protocol** is the thing, Bluesky is just one app on top of it.
- **For Signal** — nobody frames it as a protocol host because you can’t federate/self-host. Signal is just “a service,” so the OSA applies to *Signal Messenger Inc.*, full stop.
- **For Telegram** — same deal, it’s centralised, so there’s no “small operator” carve-out.
- **For Bluesky** (and Mastodon/ActivityPub, Matrix, etc.) — here people say things like:
  - *“It’s federated”*
  - *“It runs on ActivityPub”* (for Mastodon and friends)
  - *“It runs on the AT Protocol”* (for Bluesky)
  - *“Matrix”* (for federated chat, often compared against Signal/Telegram)

So in those “OSA loophole” discussions, the names that come up are **ActivityPub, Matrix, and AT Protocol**, because those are the federation layers that let lots of small operators run compliant-ish services without being “the one big provider.”

Want me to map this out explicitly — like a table showing *App name vs Protocol vs Regulatory framing (platform vs protocol)*?


#### You:
Mastodon is the thing I kept hearing a while back Mastodon

#### ChatGPT:
Exactly — that’s the one people actually name-drop.

- **Mastodon** → runs on **ActivityPub**, but most people just say *“Mastodon”* when talking about the federated model.
- **Bluesky** → same type of thing, but with **AT Protocol** instead of ActivityPub.
- **Matrix** → in chat/messaging space, the federated alternative people mention (instead of Signal/Telegram).

So when real folks talk about “self-hosting but still joining a bigger network,” the shorthand tends to be:

- *Mastodon* (for ActivityPub world)
- *Matrix* (for federated chat)
- *Bluesky* (for AT Protocol, newer)

The protocol acronyms (ActivityPub, AT, MTProto) are mostly tossed around by devs — normal conversation sticks with *Mastodon*, *Matrix*, *Bluesky*.

Want me to line up a quick side-by-side: Signal/Telegram vs Matrix/Mastodon/Bluesky, so you can see why the latter get talked about in OSA contexts?


#### You:
but is my take on the OSA allowing small-servers for your org to control its content/users, but still allow interaction with larger networks?

#### ChatGPT:
No — from what I can see of the OSA text & guidance, **your take** (small servers/operators + federated network access) isn’t clearly spelled out or guaranteed. Some parts of your idea are possible/allowed, but there are big caveats. Here’s a breakdown:

---

## What the OSA *does* say

- The OSA regulates *user-to-user (U2U) services* and *search services* that have “links with the UK,” even if based elsewhere. citeturn0search17turn0search2turn0search4turn0search9
- The obligations vary by service size, functionality, and risk. Smaller services have proportionately lighter duties. citeturn0search0turn0search4turn0search9turn0search10
- All in-scope U2U services must do risk assessments for illegal content, put in place reporting / takedown processes, mitigate harm etc. citeturn0search4turn0search0turn0search2

---

## What is *not clear / might prevent* your idea

- The law doesn’t explicitly talk about “federated services” or “protocol-based networks” (like Mastodon or ActivityPub) and offer special carve-outs for them. It treats “service providers” broadly in terms of what an “online service” is. If your server is part of a network that interacts with others, you may still be seen as an “operator/provider of a U2U service.”

- “Staying small” helps reduce the scope or severity of duties (smaller scale/risk = fewer obligations) but doesn’t exempt you entirely if you are “in scope.” Having users in the UK or risks for UK users can bring you under OSA even if you are small or mostly external. citeturn0search4turn0search3turn0search2

- Ofcom and secondary legislation will define thresholds for “Category 1 / 2 etc.” services (size, functionality etc.). If your federated node’s usage meets or contributes to those thresholds, you may be in one of the more heavily regulated categories. citeturn0search10turn0search9

---

## Conclusion

Your scenario *might* work, but only if:

1. Your server/instance is small enough (in user-count, traffic, risk) and/or limited in functionality.
2. The server/operator is careful about whether they have a “significant number of UK users” or target the UK.
3. You keep up with all the basic risk assessment, reporting, content moderation obligations (even if minimal).

If you like, I can try to model what duties *your specific use-case* (say a Mastodon-type instance for a small org) would have under OSA, so you can see concretely what you’d need to do.


#### You:
what about like Discord, where you run your own server, and the user typical accesses several other servers via the one UI, offered by yet another provider?

#### ChatGPT:
That’s a useful comparison. Here’s how it splits under the OSA lens:

**Discord today**

- You (as an end-user) create a *“server”*, but that’s really just a namespace inside Discord’s central infrastructure.
- You don’t actually run the infra — Discord Inc. does.
- Legally, *Discord* is the provider, not you. The OSA obligations sit with them.

**Federated model (Mastodon/Matrix/Bluesky style)**

- You *really do* run the infra — your own server.
- That server talks to other servers over a shared protocol.
- In OSA terms, *you* are the provider of a “user-to-user service” (because you’re transmitting user-generated content).
- So even if there’s a “unified UI” (like a client that can log into multiple servers), the OSA treats each backend server/operator as its own provider.

**Key difference**

- With Discord, all legal duties concentrate on one company.
- With federation, the duties distribute: every operator is technically on the hook (though the scale of duty depends on size, features, and risk).

So: if you spin up a Mastodon instance for your org, under OSA you’re not “just a Discord server admin” — you’re more like “a mini-Discord, but federated.” You get obligations (risk assessments, illegal content handling, etc.), though lighter than the Category 1 giants.

Want me to sketch a simple 3-column table — *Centralised (Discord), Federated (Mastodon/Matrix), Hybrid (like Element hosting Matrix servers for you)* — showing exactly where the legal hook lands in each case?


#### You:
oh, you can't run your own discord server outside of discord? like slack?

#### ChatGPT:
Correct — with **Discord** (and **Slack** too):

- You can create “servers” (Discord) or “workspaces” (Slack), but they are **logical partitions** inside the company’s own infrastructure.
- You can’t take the server software, spin it up on your own VPS, and have it interoperate with the main network.
- All the infra is controlled by Discord Inc. or Slack Technologies.

That’s why people often contrast them with **Matrix** or **Mastodon**:

- With Matrix or Mastodon you *can* run your own server software, under your own domain, and it can federate with others.
- With Discord/Slack you *cannot* — you’re always inside their walled garden.

So yeah: “Discord server” ≠ “self-hosted server.” It’s closer to a chatroom or namespace that Discord Inc. runs for you.

Want me to list the main **chat/collaboration systems you *can* actually self-host** and still interconnect with bigger networks?


#### You:
ahh, I thought they were genuinely self-hosted. I've set you to thinking mode, can you double-check all claims in this chat and give me an overall summary

#### ChatGPT:
\[Unsupported Content]


#### ChatGPT:
\[Unsupported Content]


#### ChatGPT:
\[Unsupported Content]


#### ChatGPT:
\[Unsupported Content]


#### ChatGPT:
### TL;DR (verified)

- **Bluesky** runs on the **AT Protocol** (a federated social protocol). citeturn0search0turn0search4turn0search12
- **Signal** uses the **Signal Protocol** for E2E crypto; it’s **not federated** and you can’t self-host in a way that interoperates with the public Signal network. citeturn0search5turn0search9
- **Telegram** is centralized and uses **MTProto**; you **can’t** self-host a server that federates with the main Telegram cloud. citeturn0search2turn0search6turn0search3
- **Mastodon** (what people kept saying) federates via **ActivityPub**; casual convos often say “Mastodon” instead of “ActivityPub.” (Context for naming.)
- **Matrix** is the federated chat people bring up (contrast with Signal/Telegram).
- **Discord/Slack** “servers/workspaces” are **not self-hosted**; they’re logical partitions on the provider’s infra. Slack has no on-prem product; Discord doesn’t offer self-host at all. citeturn2search6turn2search16turn2search5

### OSA angle (UK)

- OSA applies to **user-to-user services** with UK links; duties scale by size/risk but **small ≠ exempt**. You must still do things like **illegal-content risk assessments**. citeturn1search8turn1search2turn1search1turn1search12
- The law doesn’t grant a special “federation carve-out.” If you run a Mastodon/Matrix/ATProto **server**, you’re a provider in scope (duties proportionate to your size/risk). citeturn1search8turn1search2

### Net of it

- If you want **org-controlled moderation** with **interop to a larger network**, look at **Mastodon (ActivityPub)**, **Matrix**, or **Bluesky/ATProto**. Your instance remains your legal responsibility under OSA, just with proportionate obligations. citeturn1search2

If you want, I can map Mastodon/Matrix/ATProto vs OSA duties for a tiny UK org instance—super compact table.
