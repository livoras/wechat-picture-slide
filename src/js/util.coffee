$ = (selector)-> 
	doms = document.querySelectorAll selector
	if doms.length is 1 
		dom = doms[0]
		dom.on = ->
			dom.addEventListener.apply dom, arguments
		return doms[0]
	doms

class Iterator
	constructor: (list, isLoop)->
		@list = list
		@index = 0
		@isLoop = isLoop or no
	set: (index)->
		@index = index
	next: ->
		if @index + 1 is @list.length
			if @isLoop then @index = 0 else return
		else
			@index++
		@list[@index]
	prev: ->
		if @index - 1 is 0
			if @isLoop then @index = @list.length - 1 else return
		else
			@index--
		@list[@index]
	current: ->
		@list[@index]
	
module.exports = {$, Iterator}