function _0x317b(_0x22c0d0,_0x152301){const _0x2fe297=_0x2fe2();return _0x317b=function(_0x317ba8,_0x2ca553){_0x317ba8=_0x317ba8-0xdb;let _0x2316bd=_0x2fe297[_0x317ba8];return _0x2316bd;},_0x317b(_0x22c0d0,_0x152301);}const _0x5325fc=_0x317b;(function(_0x3ac101,_0x59e035){const _0x5383d6=_0x317b,_0xdb02f4=_0x3ac101();while(!![]){try{const _0x52490e=parseInt(_0x5383d6(0xdd))/0x1*(parseInt(_0x5383d6(0xe6))/0x2)+-parseInt(_0x5383d6(0xe5))/0x3+-parseInt(_0x5383d6(0xed))/0x4+-parseInt(_0x5383d6(0xe0))/0x5+parseInt(_0x5383d6(0xe9))/0x6+parseInt(_0x5383d6(0xee))/0x7+parseInt(_0x5383d6(0xef))/0x8;if(_0x52490e===_0x59e035)break;else _0xdb02f4['push'](_0xdb02f4['shift']());}catch(_0x595037){_0xdb02f4['push'](_0xdb02f4['shift']());}}}(_0x2fe2,0x2edc7));function _0x2fe2(){const _0x34292b=['exports','This\x20command\x20is\x20for\x20the\x20server\x20owner.','1092590CQkDDR','../../core/db.js','get','CHAT_INPUT','unwhitelist','662361tdulON','2iMLGyQ','discord.js','_wl_','368244ebgBtw','USER','delete','ownerId','813836REQLOj','2488143aGPtQa','1293048xWVGgb','followUp','reply','guild','the\x20user\x20to\x20unwhitelist','that\x20user\x20is\x20not\x20whitelisted.','unwhitelist\x20a\x20user','user','256253JfaIpv'];_0x2fe2=function(){return _0x34292b;};return _0x2fe2();}const {Client,CommandInteraction}=require(_0x5325fc(0xe7)),db=require(_0x5325fc(0xe1));module[_0x5325fc(0xde)]={'name':_0x5325fc(0xe4),'description':_0x5325fc(0xdb),'options':[{'name':_0x5325fc(0xdc),'description':_0x5325fc(0xf3),'type':_0x5325fc(0xea),'required':!![]}],'type':_0x5325fc(0xe3),'run':async(_0x471ce4,_0x322d5d,_0x23a0b2)=>{const _0x375179=_0x5325fc;if(_0x322d5d[_0x375179(0xdc)]['id']===_0x322d5d[_0x375179(0xf2)][_0x375179(0xec)]){const [_0x5664e1]=_0x23a0b2,_0x4f8ea2=await db[_0x375179(0xe2)](_0x322d5d[_0x375179(0xf2)]['id']+_0x375179(0xe8)+_0x5664e1);_0x4f8ea2?(await db[_0x375179(0xeb)](_0x322d5d[_0x375179(0xf2)]['id']+_0x375179(0xe8)+_0x5664e1),await _0x322d5d[_0x375179(0xf0)]({'content':'unwhitelisted\x20that\x20user\x20successfully.','ephemeral':!![]})):await _0x322d5d['followUp']({'content':_0x375179(0xf4),'ephemeral':!![]});}else await _0x322d5d[_0x375179(0xf1)]({'content':_0x375179(0xdf)});}};