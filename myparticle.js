var myparticle = {
	position: null,
	velocity: null,
	mass: 1,
	radius: 0,
	bounce: -1,
    friction: 1,
    
    create: function(x, y, speed, direction, grav) {
		var obj = Object.create(this);
		obj.position = vector.create(x, y);
		obj.velocity = vector.create(0, 0);
		obj.velocity.setLength(speed);
		obj.velocity.setAngle(direction);
		obj.gravity = vector.create(0, grav || 0);
		return obj;
    }
}