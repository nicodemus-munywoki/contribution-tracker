export const permit = (allowedRoles = []) => {
  const allowed = Array.isArray(allowedRoles)
    ? allowedRoles.map((r) => r.toLowerCase())
    : [allowedRoles.toLowerCase()];

  return (req, res, next) => {
    if (!req.user || !req.user.roles) {
      return res.status(401).json({
        success: false,
        message: 'Unauthorized',
      });
    }

    const userRoles = req.user.roles.map((r) => r.toLowerCase());

    const hasRole = userRoles.some((role) => allowed.includes(role));

    if (!hasRole) {
      return res.status(403).json({
        success: false,
        message: 'Forbidden: insufficient role',
      });
    }

    next();
  };
};
